import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAfsxMQhixWgVEVMhVjfbOnzk7vwTutjCE",
  authDomain: "devchallenges-f30f7.firebaseapp.com",
  projectId: "devchallenges-f30f7",
  storageBucket: "devchallenges-f30f7.appspot.com",
  messagingSenderId: "352187116489",
  appId: "1:352187116489:web:8129a91dc4e5e3ecdc5618",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
