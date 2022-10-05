import React, { FC } from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

import PostInfo from '../PostInfo/PostInfo';
import PostUserInfo from '../PostUserInfo/PostUserInfo';
import styles from './Post.module.css';
import { UserData } from '../../@types/user';
import { PostSkeleton } from './PostSekeleton';

interface PostProps {
  id: string;
  title: string;
  user: UserData;
  createdAt: string;
  viewsCount: number;
  tags: string[];
  commentsCount: number;
  isEditable: boolean;
  isLoading?: boolean;
}

const Post: FC<PostProps> = ({
  id,
  title,
  user,
  createdAt,
  viewsCount,
  tags,
  commentsCount,
  isEditable,
  isLoading,
}) => {
  if (isLoading) {
    return <PostSkeleton />;
  }

  return (
    <div className={styles.root}>
      <PostUserInfo userData={user} date={createdAt} />

      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}

      <ul className={styles.tagsList}>
        {tags.map((tag) => (
          <li key={tag}>#{tag}</li>
        ))}
      </ul>

      <Typography variant="h5" className={styles.title}>
        <Link to={`/posts/${id}`}>{title}</Link>
      </Typography>
      <img
        src="https://post.healthline.com/wp-content/uploads/2020/08/full-moon-night-landscape-732x549-thumbnail-1.jpg"
        className={styles.image}
      />
      <Button variant="contained" className={styles.button}>
        <Link to={`/posts/${id}`}>Читать далее</Link>
      </Button>
      <PostInfo viewsCount={viewsCount} commentsCount={commentsCount} />
    </div>
  );
};

export default Post;
