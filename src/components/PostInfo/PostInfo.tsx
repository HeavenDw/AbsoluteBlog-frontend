import React, { FC } from 'react';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import styles from './PostInfo.module.css';

interface PostInfoProps {
  viewsCount: number;
  commentsCount: number;
}

const PostInfo: FC<PostInfoProps> = ({ viewsCount, commentsCount }) => {
  return (
    <ul className={styles.root}>
      <li>
        <EyeIcon />
        <span>{viewsCount}</span>
      </li>
      <li>
        <CommentIcon />
        <span>{commentsCount}</span>
      </li>
    </ul>
  );
};

export default PostInfo;
