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
import { useDeletePostMutation } from '../../redux/api/postApi';

interface PostProps {
  id: string;
  title: string;
  user: UserData;
  createdAt: string;
  viewsCount: number;
  tags: string[];
  commentsCount: number;
  isEditable: boolean;
  imageUrl?: string;
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
  imageUrl,
  isEditable,
  isLoading,
}) => {
  const [deletePost] = useDeletePostMutation();

  const onClickRemove = () => {
    deletePost(id);
  };

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
          <IconButton onClick={onClickRemove} color="secondary">
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
      {imageUrl && <img src={`http://localhost:4444${imageUrl}`} />}
      <Button variant="contained" className={styles.button}>
        <Link to={`/posts/${id}`}>Читать далее</Link>
      </Button>
      <PostInfo viewsCount={viewsCount} commentsCount={commentsCount} />
    </div>
  );
};

export default Post;
