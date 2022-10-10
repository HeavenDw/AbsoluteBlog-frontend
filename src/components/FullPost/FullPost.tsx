import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetCommentsQuery } from '../../redux/api/commentsApi';
import { useGetFullPostQuery } from '../../redux/api/postApi';
import Comment from '../Comment/Comment';
import Index from '../Index/Index';
import PostInfo from '../PostInfo/PostInfo';
import PostUserInfo from '../PostUserInfo/PostUserInfo';
import styles from './FullPost.module.css';

const FullPost = () => {
  const { id } = useParams();

  const { data: post } = useGetFullPostQuery(id || '');
  const { data: comments } = useGetCommentsQuery(id || '');

  if (!post) {
    return <div>Loading...</div>;
  }

  const { user, createdAt, tags, title, text, viewsCount, imageUrl, _id } = post;

  return (
    <div className={styles.root}>
      <PostUserInfo userData={user} date={createdAt} />

      {tags && (
        <ul className={styles.tagsList}>
          {tags.map((tag) => (
            <li key={tag}>#{tag}</li>
          ))}
        </ul>
      )}

      <Typography variant="h5" className={styles.title}>
        {title}
      </Typography>
      {imageUrl && <img src={`http://localhost:4444${imageUrl}`} />}
      <Typography variant="body1">{text}</Typography>
      <PostInfo viewsCount={viewsCount} commentsCount={comments?.length || 0} />

      {comments?.length ? (
        <ul className={styles.comments}>
          {comments.map((comment) => {
            return <Comment key={comment._id} {...comment} />;
          })}
        </ul>
      ) : (
        <div>Нет комментариев</div>
      )}
      <Index postId={_id} />
    </div>
  );
};

export default FullPost;
