import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDs2T8UyEVkoGl-LENV4b3kwQHsxUYFZ3s",
  authDomain: "supervisor-manager.firebaseapp.com",
  projectId: "supervisor-manager",
  storageBucket: "supervisor-manager.firebasestorage.app",
  messagingSenderId: "606622765955",
  appId: "1:606622765955:web:3f4c81050f129d4ea01cb6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };