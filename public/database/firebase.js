import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDtIemNlizlTuNxT2dUc9-OZUPRhTvaUaI",
  authDomain: "cascadasaguaazul.firebaseapp.com",
  projectId: "cascadasaguaazul",
  storageBucket: "cascadasaguaazul.appspot.com",
  messagingSenderId: "326823088100",
  appId: "1:326823088100:web:269b25ce52466c602441f1",
};

initializeApp(firebaseConfig);

export const db = getFirestore();

