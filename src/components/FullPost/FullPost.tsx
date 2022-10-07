import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetFullPostQuery } from '../../redux/api/postApi';
import PostInfo from '../PostInfo/PostInfo';
import PostUserInfo from '../PostUserInfo/PostUserInfo';
import styles from './FullPost.module.css';

const FullPost = () => {
  const { id } = useParams();

  const { data: post } = useGetFullPostQuery(id || '');

  if (!post) {
    return <div>Loading...</div>;
  }

  const { user, createdAt, tags, title, text, viewsCount, imageUrl } = post;

  return (
    <div className={styles.root}>
      <PostUserInfo userData={user} date={createdAt} />

      <ul className={styles.tagsList}>
        {tags.map((tag) => (
          <li key={tag}>#{tag}</li>
        ))}
      </ul>

      <Typography variant="h5" className={styles.title}>
        {title}
      </Typography>
      {imageUrl && <img src={`http://localhost:4444${imageUrl}`} />}
      <Typography variant="body1">{text}</Typography>
      <PostInfo viewsCount={viewsCount} commentsCount={3} />
    </div>
  );
};

export default FullPost;
