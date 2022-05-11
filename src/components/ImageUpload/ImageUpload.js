import {useState} from 'react';
import { Input, Button } from '@chakra-ui/react'
import {db, storage} from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import {auth} from "../../firebase";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if(e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  const handleUpload = () => {
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    
    uploadTask.on('state_changed', (snapshot) => {
      const progressValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progressValue);
    },
    (error) => {
      console.log(error.message);
    },
    () => {
      getDownloadURL(storageRef)
        .then(url => {
          const docRef = addDoc(collection(db, "posts"), {
            timestamp: serverTimestamp(),
            caption: caption,
            imageURL: url,
          })

          setProgress(0);
          setCaption("");
          setImage(null);
        })
        .catch(e => console.log(e.message));
    })
  }

  return (
    <div>
      <progress value={progress} max="100" />
      <Input placeholder="Enter Caption" value={caption} onChange={(e) => setCaption(e.target.value)}/>      
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Post</Button>      
    </div>
  )
}

export default ImageUpload