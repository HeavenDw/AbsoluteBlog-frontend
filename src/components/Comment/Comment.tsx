import React, { FC, useState } from 'react';
import { Avatar, IconButton, TextField } from '@mui/material';
import ReactTimeAgo from 'react-time-ago';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

import { UserData } from '../../@types/user';
import styles from './Comment.module.scss';
import { useAuthMeQuery } from '../../redux/api/userApi';
import { useDeleteCommentMutation, useUpdatePostMutation } from '../../redux/api/commentsApi';
import Button from '../Button/Button';
import { useAppSelector } from '../../redux/hooks';

interface CommentProps {
  text: string;
  postId: string;
  createdAt: string;
  user: UserData;
  _id: string;
}

const Comment: FC<CommentProps> = ({ text, postId, createdAt, user, _id }) => {
  const { data: userData } = useAuthMeQuery();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment, { isError }] = useUpdatePostMutation();
  const formatedDate = Date.parse(createdAt);
  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState<string>(text);
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const onClickRemove = () => {
    if (window.confirm('Вы точно хотите удалить комментарий?')) {
      deleteComment({ _id, postId });
      alert('Комментарий успешно удален');
    }
  };

  const onClickUpdateComment = () => {
    updateComment({ _id, text: newText });
    setEditing(false);
  };

  const isEditable = isAuth && userData?._id === user._id;

  return (
    <>
      <li className={styles.root}>
        <Avatar src={'https://absolute-blog.herokuapp.com' + user?.avatarUrl} />
        <div className={styles.main}>
          <div className={styles.userInfo}>
            <span>{user.nickname}</span>
            <ReactTimeAgo date={formatedDate} locale="ru-Ru" timeStyle="round" />
          </div>
          <div className={styles.text}>
            {isEditing ? (
              <>
                <TextField
                  color="info"
                  variant="outlined"
                  maxRows={10}
                  fullWidth
                  multiline
                  label={'Введите текст'}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                />
                {isError && <div className={styles.error}>Не удалось обновить комментарий</div>}
                <Button variant="secondary" onClick={onClickUpdateComment}>
                  Обновить
                </Button>
              </>
            ) : (
              <span>{text}</span>
            )}
          </div>
        </div>

        {isEditable && (
          <div className={styles.editButtons}>
            <IconButton onClick={() => setEditing(true)} color="info">
              <EditIcon />
            </IconButton>
            <IconButton onClick={onClickRemove} color="secondary">
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </li>
    </>
  );
};

export default Comment;
