import { useState, useEffect } from "react";
import { Avatar } from '@chakra-ui/react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from "../../firebase";
import { Input, Button, Text } from "@chakra-ui/react";
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
    const postsRef = collection(db, "posts", postId, "comments")
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
      <Text display="flex" marginTop="10px" marginBottom="20px" marginLeft="10px">
        <Text
          marginRight="10px"
          fontWeight="bold"
        >
          {post.username}: </Text><Text noOfLines={3}>{post.caption}</Text>
      </Text>

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
            placeholder="Add a comment..."
            variant="outline"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button

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