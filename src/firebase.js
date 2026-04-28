import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "spottr-6d8a9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
