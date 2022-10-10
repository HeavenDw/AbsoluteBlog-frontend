import React from 'react';
import { Avatar, Button, TextField } from '@mui/material';

import styles from './Index.module.css';
import { useCreateCommentMutation } from '../../redux/api/commentsApi';
import { useAuthMeQuery } from '../../redux/api/userApi';

interface IndexProps {
  postId: string;
}

const Index: React.FC<IndexProps> = ({ postId }) => {
  const [text, setText] = React.useState('');
  const [createComment] = useCreateCommentMutation();
  const { data: userData } = useAuthMeQuery();

  const createPostComment = async () => {
    const fields = {
      postId,
      text,
    };

    createComment(fields)
      .unwrap()
      .then(() => setText(''))
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.root}>
      <Avatar src={'http://localhost:4444' + userData?.avatarUrl} />
      <div className={styles.form}>
        <TextField
          label="Написать комментарий"
          variant="outlined"
          maxRows={10}
          multiline
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button sx={{ mt: '10px' }} variant="contained" onClick={createPostComment}>
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default Index;
