import {initializeApp} from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC7CPslGCTRyAqEWO3VgjMuytBS-hy4oJQ",
  authDomain: "findergame-3561b.firebaseapp.com",
  projectId: "findergame-3561b",
  storageBucket: "findergame-3561b.appspot.com",
  messagingSenderId: "650333446283",
  appId: "1:650333446283:web:d6b3a1fe790c75d2b5b48e"
};

const app = initializeApp(firebaseConfig);

function newCharacter(name, position, radius, portrait) {

}

export {newCharacter};
