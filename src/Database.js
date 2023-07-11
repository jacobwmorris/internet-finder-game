import {initializeApp} from "firebase/app";
import {
  getFirestore,
  doc, collection,
  query, orderBy, limit,
  setDoc, addDoc, getDoc, getDocs,
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

export async function newCharacter(name, position, radius, portrait) {
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

export function setupCharacterListener(handleNewData) {
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

export async function getRandomThree() {
  try {
    const characters = collection(db, "characters");
    const snapshot = await getDocs(characters);
    const charArray = snapshot.docs.map((d) => {
      const data = d.data();
      const char = {name: data.name};
      if (data.portrait) {char.portrait = data.portrait};
      return char;
    });

    return randomFromArray(charArray);
  }
  catch (err) {
    console.error(err);
    return [];
  }
}

function randomFromArray(arr) {
  const rand3 = [];

  for (let i = 0; i < 3; i++) {
    if (arr.length === 0) {
      break;
    }
    const index = Math.floor(Math.random() * arr.length);
    rand3.push(arr[index]);
    arr.splice(index, 1);
  }

  return rand3;
}

export async function checkGuess(name, position) {
  try {
    const character = doc(db, "characters", name);
    const snapshot = await getDoc(character);
    if (!snapshot.exists()) {return false;}
    const data = snapshot.data();
    const center = {x: data.x, y: data.y};
    const radiusSquared = data.rx * data.rx + data.ry * data.ry;
    return isWithinCircle(position, center, radiusSquared)
  }
  catch (err) {
    console.error(err);
    return false;
  }
}

function isWithinCircle(pos, center, radSquared) {
  const distX = pos.x - center.x;
  const distY = pos.y - center.y;
  const distSquared = distX * distX + distY * distY;
  return distSquared <= radSquared;
}

export async function getScoreboard(count) {
  try {
    const scoreQuery = query(collection(db, "highscores"), orderBy("time"), limit(count));
    const snapshot = await getDocs(scoreQuery);
    return snapshot.docs.map((d) => {
      const data = d.data();
      return {id: d.id, player: data.player, time: data.time};
    });
  }
  catch (err) {
    console.error(err);
    return [];
  }
}

export async function postScore(player, time) {
  try {
    const scoreboard = collection(db, "highscores");
    await addDoc(scoreboard, {player, time});
  }
  catch (err) {
    console.error(err);
  }
}

export function startEmulator() {
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}
