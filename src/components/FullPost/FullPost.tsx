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

  const { user, createdAt, tags, title, text, viewsCount } = post;

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
      <img
        src="https://post.healthline.com/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1.jpg"
        className={styles.image}
      />
      <Typography variant="body1">{text}</Typography>
      <PostInfo viewsCount={viewsCount} commentsCount={3} />
    </div>
  );
};

export default FullPost;
