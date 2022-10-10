import React from 'react';
import { Avatar, Button, Divider, IconButton, TextField } from '@mui/material';
import ReactTimeAgo from 'react-time-ago';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

import { UserData } from '../../@types/user';
import styles from './Comment.module.css';
import { useAuthMeQuery } from '../../redux/api/userApi';
import { useDeleteCommentMutation, useUpdatePostMutation } from '../../redux/api/commentsApi';

interface CommentProps {
  text: string;
  postId: string;
  createdAt: string;
  user: UserData;
  _id: string;
}

const Comment: React.FC<CommentProps> = ({ text, postId, createdAt, user, _id }) => {
  const { data: userData } = useAuthMeQuery();
  const [deleteComment] = useDeleteCommentMutation();
  const [updateComment] = useUpdatePostMutation();
  const formatedDate = Date.parse(createdAt);
  const [isEditing, setEditing] = React.useState(false);
  const [newText, setNewText] = React.useState<string>(text);

  const onClickRemove = () => {
    deleteComment({ _id, postId });
  };

  const onClickUpdateComment = () => {
    updateComment({ _id, text: newText });
    setEditing(false);
  };

  const isEditable = userData?._id === user._id;

  return (
    <>
      <li className={styles.root}>
        <Avatar src={'http://localhost:4444' + user?.avatarUrl} />
        <div>
          <div className={styles.userInfo}>
            <span>{user.nickname}</span>
            <ReactTimeAgo date={formatedDate} locale="ru-Ru" timeStyle="round" />
          </div>
          {isEditing ? (
            <>
              <TextField
                variant="outlined"
                maxRows={10}
                multiline
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
              <Button variant="contained" onClick={onClickUpdateComment}>
                Обновить комментарий
              </Button>
            </>
          ) : (
            <span>{text}</span>
          )}
        </div>

        {isEditable && (
          <div className={styles.editButtons}>
            <IconButton onClick={() => setEditing(true)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={onClickRemove} color="secondary">
              <DeleteIcon />
            </IconButton>
          </div>
        )}
      </li>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default Comment;
