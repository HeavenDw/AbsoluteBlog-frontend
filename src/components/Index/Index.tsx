import React, { FC, useState } from 'react';
import { Avatar, TextField } from '@mui/material';

import styles from './Index.module.scss';
import { useCreateCommentMutation } from '../../redux/api/commentsApi';
import { useAuthMeQuery } from '../../redux/api/userApi';
import Button from '../Button/Button';

interface IndexProps {
  postId: string;
}

const Index: FC<IndexProps> = ({ postId }) => {
  const [text, setText] = useState('');
  const [createComment, { isError }] = useCreateCommentMutation();
  const { data: userData } = useAuthMeQuery();

  const createPostComment = async () => {
    const fields = {
      postId,
      text,
    };

    createComment(fields)
      .unwrap()
      .then(() => setText(''));
  };

  return (
    <div className={styles.root}>
      <Avatar src={userData?.avatarUrl} />
      <div className={styles.form}>
        <TextField
          label="Написать комментарий"
          variant="outlined"
          color="info"
          maxRows={10}
          multiline
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {isError && <div className={styles.error}>Не удалось создать комментарий</div>}
        <Button variant="secondary" onClick={createPostComment}>
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default Index;
