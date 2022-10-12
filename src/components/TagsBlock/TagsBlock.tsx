import React from 'react';
import { Rings } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { useGetLastTagsQuery } from '../../redux/api/postApi';
import styles from './TagsBlock.module.scss';

const TagsBlock = () => {
  const { data: tags } = useGetLastTagsQuery();

  if (!tags) {
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
      <h3 className={styles.title}>Последние тэги:</h3>
      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li key={tag}>
            <Link to={`/tag/${tag}`}>#{tag}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsBlock;
