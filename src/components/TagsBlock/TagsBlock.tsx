import React from 'react';
import { Link } from 'react-router-dom';

import { useGetLastTagsQuery } from '../../redux/api/postApi';

const TagsBlock = () => {
  const { data: tags } = useGetLastTagsQuery();

  if (!tags) {
    return <div>Loader</div>;
  }

  return (
    <>
      <h3>Последние тэги:</h3>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>
            <Link to={`/tag/${tag}`}>#{tag}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TagsBlock;
