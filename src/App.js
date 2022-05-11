import './App.css';
import { useState, useEffect } from "react";
import Post from './components/Post/Post';
import { auth, db, provider } from "./firebase";
import { collection, onSnapshot, doc } from "firebase/firestore";
import { signInWithPopup } from 'firebase/auth';
import { FaGoogle } from "react-icons/fa";
import { Button } from '@chakra-ui/react'

function App() {
  const [posts, setPosts] = useState([]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.log(e.message);
    }
  }

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

        <Button
          bg="#023E8A"
          color="#fafafa"
          _hover={{ opacity: 0.9 }}
          leftIcon={<FaGoogle />}
          onClick={signInWithGoogle}
        >
          Sign in
        </Button>
      </div>


      {posts.map(({ id, post }) => (
        <Post key={id} post={post} />
      ))}
    </div>
  );
}

export default App;
