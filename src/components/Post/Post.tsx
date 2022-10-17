import React, { FC } from 'react';
import { IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

import PostInfo from '../PostInfo/PostInfo';
import PostUserInfo from '../PostUserInfo/PostUserInfo';
import styles from './Post.module.scss';
import { UserData } from '../../@types/user';
import { PostSkeleton } from './PostSekeleton';
import { useDeletePostMutation } from '../../redux/api/postApi';
import Button from '../Button/Button';

interface PostProps {
  id: string;
  title: string;
  text: string;
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
  text,
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
    if (window.confirm('Вы точно хотите удалить статью?')) {
      deletePost(id);
    }
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
            <IconButton color="info">
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
          <li key={tag}>
            <Link to={`/tag/${tag}`}>#{tag}</Link>
          </li>
        ))}
      </ul>

      <Typography variant="h5" className={styles.title}>
        <Link to={`/posts/${id}`}>{title}</Link>
      </Typography>
      <Typography variant="body1" className={styles.text}>
        {text}
      </Typography>
      {imageUrl && <img className={styles.image} src={imageUrl} alt="post preview" />}

      <Link to={`/posts/${id}`} className={styles.button}>
        <Button variant="secondary">Читать далее</Button>
      </Link>

      <PostInfo viewsCount={viewsCount} commentsCount={commentsCount} />
    </div>
  );
};

export default Post;
