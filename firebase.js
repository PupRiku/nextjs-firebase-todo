import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPcOrmoyBKI34ZRs-nXq8fNpni0iDKdzw",
  authDomain: "nextjs-firebase-todo-41efa.firebaseapp.com",
  projectId: "nextjs-firebase-todo-41efa",
  storageBucket: "nextjs-firebase-todo-41efa.appspot.com",
  messagingSenderId: "837953772246",
  appId: "1:837953772246:web:289ceae5f4224c34190777",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
