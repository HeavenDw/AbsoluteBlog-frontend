import React from 'react';

import { useGetCommentsQuery } from '../../redux/api/commentsApi';
import Comment from '../Comment/Comment';

const CommentsBlock = () => {
  const { data: comments } = useGetCommentsQuery('');

  if (!comments) {
    return <div>Loader</div>;
  }

  return (
    <>
      <h3>Последние комментарии:</h3>
      <ul>
        {comments.map((comment) => {
          return <Comment key={comment._id} {...comment} />;
        })}
      </ul>
    </>
  );
};

export default CommentsBlock;
