import "./ImageUpload.css";
import { useState } from 'react';
import { Textarea, Button, Progress } from '@chakra-ui/react'
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ImageUpload = ({ username, onUploadClose }) => {
  
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
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
              username: username,
            })

            setProgress(0);
            setCaption("");
            setImage(null);

            onUploadClose();
          })
          .catch(e => console.log(e.message));
      })
  }

  return (
    <div className="imageUpload">
      <Progress className="progress_bar" colorScheme="green" size="md" value={progress} />
      <Textarea
        placeholder="Enter Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        resize="none"
      />
      <input className="file_button" type="file" onChange={handleChange} />
      <Button colorScheme="facebook" _hover={{ opacity: 0.9 }} onClick={handleUpload}>Post</Button>
    </div>
  )
}

export default ImageUpload