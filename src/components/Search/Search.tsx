import { TextField } from '@mui/material';
import React, { ChangeEvent, FC, useState } from 'react';

import { useGetPostsQuery } from '../../redux/api/postApi';
import { useAuthMeQuery } from '../../redux/api/userApi';
import Button from '../Button/Button';
import Post from '../Post/Post';
import { PostSkeleton } from '../Post/PostSekeleton';
import styles from './Search.module.scss';

interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const [searchBy, setSearchBy] = useState('');
  const [skip, setSkip] = useState(true);

  const { data: posts, isLoading } = useGetPostsQuery({ searchBy }, { skip });
  const { data: userData } = useAuthMeQuery();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkip(true);
    setSearchBy(e.target.value);
  };

  return (
    <div className={styles.root}>
      <TextField
        label="Найти статью"
        variant="outlined"
        color="info"
        maxRows={10}
        multiline
        fullWidth
        value={searchBy}
        onChange={handleOnChange}
        sx={{ backgroundColor: '#fff' }}
      />

      <Button variant="secondary" onClick={() => setSkip((prev) => !prev)}>
        Найти
      </Button>
      {isLoading
        ? [...Array(3)].map((item, index) => <PostSkeleton key={index} />)
        : posts?.map((post) => (
            <Post
              id={post._id}
              key={post._id}
              {...post}
              isEditable={userData?._id === post.user?._id}
            />
          ))}
    </div>
  );
};

export default Search;
