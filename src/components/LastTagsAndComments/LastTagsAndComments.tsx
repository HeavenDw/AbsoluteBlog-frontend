import React, { FC } from 'react';

import TagsBlock from '../TagsBlock/TagsBlock';
import CommentsBlock from '../CommentsBlock/CommentsBlock';
import styles from './LastTagsAndComments.module.scss';
import Navigation from '../Navigation/Navigation';

interface LastTagsAndCommentsProps {}

const LastTagsAndComments: FC<LastTagsAndCommentsProps> = () => {
  return (
    <div className={styles.root}>
      <Navigation />
      <TagsBlock />
      <CommentsBlock />
    </div>
  );
};

export default LastTagsAndComments;
