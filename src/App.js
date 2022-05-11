import './App.css';
import { useState, useEffect } from "react";
import Post from './components/Post/Post';
import ImageUpload from "./components/ImageUpload/ImageUpload";
import { auth, db, provider } from "./firebase";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { signInWithPopup } from 'firebase/auth';
import { FaGoogle } from "react-icons/fa";
import { Button } from '@chakra-ui/react'

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

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("Successfully signed out.");
    } catch (e) {
      console.log("Unable to signout the user.");
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
    onSnapshot(postsRef, (snapShot) => {
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
      <div className="app_header">
        <img
          className='app_headerImg'
          src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
          alt=''
        />

        {user === null ? (
          <Button
            bg="#023E8A"
            color="#fafafa"
            _hover={{ opacity: 0.9 }}
            leftIcon={<FaGoogle />}
            onClick={loginInWithGoogle}
          >
            Sign in
          </Button>
        ) : (
            <Button
              bg="#023E8A"
              color="#fafafa"
              _hover={{ opacity: 0.9 }}
              onClick={logOut}
            >
              Logout
            </Button>
        )}
      </div>

      {user?.displayName ? 
        (
          <ImageUpload />
        ) : 
        (
          <h3>Sorry, you need to login to post</h3>
        )
      }

      {posts.map(({ id, post }) => (
        <Post key={id} post={post} />
      ))}
    </div>
  );
}

export default App;
