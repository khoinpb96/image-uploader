import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "devchallenges-f30f7.firebaseapp.com",
  projectId: "devchallenges-f30f7",
  storageBucket: "devchallenges-f30f7.appspot.com",
  messagingSenderId: "352187116489",
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
