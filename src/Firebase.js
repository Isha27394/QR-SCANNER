import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSaAJOltx57nc_QN0X_vHph_Yypk9Ao5c",
  authDomain: "bookify-9cd01.firebaseapp.com",
  databaseURL: "https://bookify-9cd01-default-rtdb.firebaseio.com",
  projectId: "bookify-9cd01",
  storageBucket: "bookify-9cd01.firebasestorage.app",
  messagingSenderId: "292269843289",
  appId: "1:292269843289:web:d48db5c264d3c598b76248",
  measurementId: "G-0ZGYNJXTX1"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);