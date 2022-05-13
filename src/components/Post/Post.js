import { useState, useEffect } from "react";
import { Avatar } from '@chakra-ui/react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from "../../firebase";
import { Input, Button, Text } from "@chakra-ui/react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { RiShareForwardLine } from "react-icons/ri";
import { FaRegBookmark } from "react-icons/fa";
import './Post.css';

const Post = ({ user, post, postId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsub;

    if (postId) {
      const postsRef = collection(db, "posts", postId, "comments");
      const orderedRef = query(postsRef, orderBy("timestamp", "desc"));
      unsub = onSnapshot(orderedRef, (snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
      });
    }

    return () => {
      unsub();
    };
  }, [postId])

  const postComment = (e) => {
    e.preventDefault();
    const postsRef = collection(db, "posts", postId, "comments");
    const postRef = addDoc(postsRef, {
      username: user?.displayName,
      text: comment,
      timestamp: serverTimestamp(),
    });
    setComment("");
  }

  return (
    <div className='post'>
      <div className="post_header">
        <Avatar size="md" name={post.username} src="" />
        <Text fontSize="lg" marginLeft="10px" fontWeight="bold" >{post.username}</Text>
      </div>

      <img
        className='post_image'
        src={post.imageURL}
      />

      <div style={{ display: "flex", justifyContent: "space-between", margin: "10px" }}>
        <div style={{ display: "flex" }}>
          <Button
            variant="ghost"
            textAlign="center"
            padding="0"
            borderRadius="50%"
            _focus={{ outline: "none" }}
          >
            <IoMdHeartEmpty fontSize="25px" />
          </Button>

          <Button
            variant="ghost"
            textAlign="center"
            padding="0"
            borderRadius="50%"
            _focus={{ outline: "none" }}
          >
            <RiShareForwardLine fontSize="23px" />
          </Button>
        </div>
        <Button
          variant="ghost"
          padding="0"
          borderRadius="50%"
          _focus={{ outline: "none" }}
        >
          <FaRegBookmark fontSize="20px" />
        </Button>
      </div>

      <p className="post_caption"><strong>{post.username}: </strong>{post.caption}</p>

      <div className="post_comments">
        {comments?.map((comment, index) => (
          <Text display="flex" key={index}>
            <Text fontWeight="bold" marginRight="10px">{comment.username}: </Text>{comment.text}
          </Text>
        ))}
      </div>

      {user &&
        <form className="post_comment_box">
          <Input
            className="comment_input"
            type="text"
            placeholder={`Add comment as ${user?.displayName}`}
            _placeholder={{ opacity: 1, color: 'gray.400' }}
            variant="outline"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            variant="outline"
            colorScheme="blue"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Add
          </Button>
        </form>
      }
    </div>
  )
}

export default Post