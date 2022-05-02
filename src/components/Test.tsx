import React, { useState } from "react";
import axios from "axios";

import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfsxMQhixWgVEVMhVjfbOnzk7vwTutjCE",
  authDomain: "devchallenges-f30f7.firebaseapp.com",
  projectId: "devchallenges-f30f7",
  storageBucket: "devchallenges-f30f7.appspot.com",
  messagingSenderId: "352187116489",
  appId: "1:352187116489:web:8129a91dc4e5e3ecdc5618",
};

type State = "standby" | "uploading" | "finished";

export default function Test() {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const onChangeHandler = async (e: any) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, file.name);

    const res = uploadBytesResumable(storageRef, file);

    // const downloadURL = await getDownloadURL(storageRef);
    // console.log("res", res);
    // console.log("downloadURL", downloadURL);

    res.on(
      "state_changed",
      (snapshot: any) => {
        setState("uploading");
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercent(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error: any) => {
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
          default:
            break;
        }
      },
      () => {
        getDownloadURL(storageRef).then((downloadURL) => {
          setState("finished");
          setImgURL(downloadURL);
        });
      }
    );
  };

  const [state, setState] = useState<State>("standby");

  const [percent, setPercent] = useState(0);
  const [imgURL, setImgURL] = useState("");
  if (state === "uploading") return <p>Uploading {percent}</p>;
  if (state === "finished") return <img src={imgURL} />;
  return <input type="file" name="file" onChange={onChangeHandler} />;
}
