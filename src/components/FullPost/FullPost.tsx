import { Typography } from '@mui/material';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useGetCommentsQuery } from '../../redux/api/commentsApi';
import { useDeletePostMutation, useGetFullPostQuery } from '../../redux/api/postApi';
import { useAuthMeQuery } from '../../redux/api/userApi';
import Button from '../Button/Button';
import Comment from '../Comment/Comment';
import Index from '../Index/Index';
import PostInfo from '../PostInfo/PostInfo';
import PostUserInfo from '../PostUserInfo/PostUserInfo';
import styles from './FullPost.module.scss';

const FullPost = () => {
  const { id } = useParams();

  const { data: post } = useGetFullPostQuery(id || '');
  const { data: comments } = useGetCommentsQuery(id || '');
  const { data: userData } = useAuthMeQuery();
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();

  if (!post) {
    return <div>Loader</div>;
  }

  const { user, createdAt, tags, title, text, viewsCount, imageUrl, _id } = post;

  const onClickRemove = () => {
    if (window.confirm('Вы точно хотите удалить статью?')) {
      deletePost(_id);
      navigate('/');
    }
  };

  const isEditable = userData?._id === user._id;

  return (
    <div className={styles.root}>
      <div className={styles.post}>
        {isEditable && (
          <div className={styles.editButtons}>
            <Link to={`/posts/${id}/edit`}>
              <Button variant="secondary">Изменить</Button>
            </Link>
            <Button variant="red" onClick={onClickRemove}>
              Удалить
            </Button>
          </div>
        )}
        <PostUserInfo userData={user} date={createdAt} />

        {tags && (
          <ul className={styles.tagsList}>
            {tags.map((tag) => (
              <li key={tag}>#{tag}</li>
            ))}
          </ul>
        )}

        <h3 className={styles.title}>{title}</h3>
        {imageUrl && (
          <div className={styles.image}>
            <img src={`http://localhost:4444${imageUrl}`} />
          </div>
        )}
        <ReactMarkdown children={text} />
        <PostInfo viewsCount={viewsCount} commentsCount={comments?.length || 0} />
      </div>

      <div className={styles.comments}>
        {comments?.length ? (
          <ul className={styles.commentsList}>
            {comments.map((comment) => {
              return <Comment key={comment._id} {...comment} />;
            })}
          </ul>
        ) : (
          <div>Нет комментариев</div>
        )}
        <Index postId={_id} />
      </div>
    </div>
  );
};

export default FullPost;
