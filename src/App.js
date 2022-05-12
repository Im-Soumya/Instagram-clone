import './App.css';
import { useState, useEffect } from "react";
import Post from './components/Post/Post';
import Header from './components/Header/Header';
import { auth, db, provider } from "./firebase";
import { onAuthStateChanged, signInWithPopup, updateProfile } from "firebase/auth";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { Text, Button } from '@chakra-ui/react';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  const loginInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      updateProfile(auth.currentUser, {
        displayName: auth.currentUser.displayName,
      })
    } catch (e) {
      console.log(e.message);
    }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser.displayName);
        setUser(currentUser);
      } else {
        setUser(null);
      }
    })

    return () => {
      unsub();
    }
  }, [user]);

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const orderedRef = query(postsRef, orderBy('timestamp', 'desc'));
    onSnapshot(orderedRef, (snapShot) => {
      setPosts(snapShot.docs.map(doc => (
        {
          id: doc.id,
          post: doc.data(),
        }
      )));
    })
  }, [])


  return (
    <div className="app">
      <Header user={user} />

      {posts.map(({ id, post }) => (
        <Post key={id} postId={id} post={post} user={user} />
      ))}

      {user === null &&
        <Text marginBottom="20px" fontSize="xl" fontWeight="bold">Sorry, <Button variant="link" size="xl" onClick={loginInWithGoogle}>Login</Button> to post something.</Text>
      }
    </div>
  );
}

export default App;
