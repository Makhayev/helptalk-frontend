import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBhhZ-IXwY95ZidAf-ydUCmWj95UqGQzIU",
  authDomain: "helptalk-data.firebaseapp.com",
  projectId: "helptalk-data",
  storageBucket: "helptalk-data.appspot.com",
  messagingSenderId: "187010380202",
  appId: "1:187010380202:web:7ec0717eace323d76fbbd3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
