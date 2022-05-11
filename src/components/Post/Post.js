import { Avatar, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import './Post.css';

const Post = ({ post }) => {
  return (
    <div className='post'>
      <div className="post_header">
        <Avatar size="md" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
        <h3><strong>{post.username}</strong></h3>
      </div>
      <img
        className='post_image'
        src={post.imageURL}
      />
      <h4 className='post_text'><strong>{post.username}: </strong>{post.caption}</h4>
    </div>
  )
}

export default Post