import React from 'react';
import { Rings } from 'react-loader-spinner';

import { useGetCommentsQuery } from '../../redux/api/commentsApi';
import Comment from '../Comment/Comment';
import styles from './CommentsBlock.module.scss';

const CommentsBlock = () => {
  const { data: comments } = useGetCommentsQuery('');

  if (!comments) {
    return (
      <Rings
        height="200"
        width="200"
        color="#d32f2f"
        radius="6"
        visible={true}
        ariaLabel="rings-loading"
      />
    );
  }

  return (
    <div className={styles.root}>
      <h3 className={styles.title}>Последние комментарии:</h3>
      <ul className={styles.comments}>
        {comments.map((comment) => {
          return <Comment key={comment._id} {...comment} />;
        })}
      </ul>
    </div>
  );
};

export default CommentsBlock;
