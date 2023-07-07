import {initializeApp} from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  onSnapshot,
  connectFirestoreEmulator
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  connectStorageEmulator
} from "firebase/storage";

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
const storage = getStorage(app);

async function newCharacter(name, position, radius, portrait) {
  const charFields = {name: name, x: position.x, y: position.y, rx: radius.x, ry: radius.y};

  if (portrait) {
    try {
      const imageRef = ref(storage, "portraits/" + name);
      await uploadBytesResumable(imageRef, portrait, {contentType: portrait.type});
      const displayUrl = await getDownloadURL(imageRef);
      charFields.portrait = displayUrl;
    }
    catch (err) {
      console.error(err);
    }
  }

  try {
    await setDoc(doc(db, "characters", name), charFields);
  }
  catch (err) {
    console.error(err);
    return false;
  }

  return true;
}

function setupCharacterListener(handleNewData) {
  const characters = collection(db, "characters");
  const stopListener = onSnapshot(characters, (snap) => {
    const displayInfo = snap.docs.map((d) => {
      const data = d.data();
      return {
        name: data.name,
        pos: {x: data.x, y: data.y},
        radius: {x: data.rx, y: data.ry}
      };
    });

    handleNewData(displayInfo);
  },
  (err) => {
    console.error(err);
  });

  return stopListener;
}

function startEmulator() {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}

export {newCharacter, startEmulator, setupCharacterListener};
