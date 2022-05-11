import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYfcAbfodj7Hu1k7hUgo43Qk5t-0icx1Y",
  authDomain: "instagram-clone-react-7e7fd.firebaseapp.com",
  projectId: "instagram-clone-react-7e7fd",
  storageBucket: "instagram-clone-react-7e7fd.appspot.com",
  messagingSenderId: "598097028847",
  appId: "1:598097028847:web:25e2332519f8e0ed6c1d1a"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export { auth, db, storage, provider };