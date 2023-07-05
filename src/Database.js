import {initializeApp} from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7CPslGCTRyAqEWO3VgjMuytBS-hy4oJQ",
  authDomain: "findergame-3561b.firebaseapp.com",
  projectId: "findergame-3561b",
  storageBucket: "findergame-3561b.appspot.com",
  messagingSenderId: "650333446283",
  appId: "1:650333446283:web:d6b3a1fe790c75d2b5b48e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function newCharacter(name, position, radius, portrait) {
  //If portrait is given, put it in cloud storage
  const charFields = {name: name, x: position.x, y: position.y, radius: radius};

  try {
    const newChar = await setDoc(doc(db, "characters", name), charFields);
  }
  catch (err) {
    console.error(err);
    return false;
  }

  return true;
}

export {newCharacter};
