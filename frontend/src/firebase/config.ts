import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1Z0nI6Rdr6bt81q5WjwFfde7KCMAQRYM",
  authDomain: "expensetracker-bc796.firebaseapp.com",
  projectId: "expensetracker-bc796",
  storageBucket: "expensetracker-bc796.firebasestorage.app",
  messagingSenderId: "741360013510",
  appId: "1:741360013510:web:88ebbdc3b973470fbe47c7",
  measurementId: "G-S5H1SP3GGP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export  {auth}