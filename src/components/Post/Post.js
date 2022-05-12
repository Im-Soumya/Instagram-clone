import { useState, useEffect } from "react";
import { Avatar } from '@chakra-ui/react';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from "../../firebase";
import { Input, Button } from "@chakra-ui/react";
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
        <h3><strong>{post.username}</strong></h3>
      </div>
      <img
        className='post_image'
        src={post.imageURL}
      />
      <h4 className='post_text'><strong>{post.username}: </strong>{post.caption}</h4>

      <div className="post_comments">
        {comments?.map((comment, index) => (
          <p key={index}>
            <strong>{comment.username}: </strong>{comment.text}
          </p>
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