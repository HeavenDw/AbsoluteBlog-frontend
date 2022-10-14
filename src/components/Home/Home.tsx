import React from 'react';
import { Grid } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Clear';

import { useGetPostsQuery } from '../../redux/api/postApi';
import { useAuthMeQuery } from '../../redux/api/userApi';
import Post from '../Post/Post';
import { PostSkeleton } from '../Post/PostSekeleton';
import TagsBlock from '../TagsBlock/TagsBlock';
import CommentsBlock from '../CommentsBlock/CommentsBlock';
import SortList from '../SortList/SortList';
import styles from './Home.module.scss';
import Navigation from '../Navigation/Navigation';
import { useAppSelector } from '../../redux/hooks';

const Home = () => {
  const { tag, sortBy } = useParams();
  const { data: posts, isLoading, isError } = useGetPostsQuery({ tag: tag, sortBy: sortBy });
  const { data: userData } = useAuthMeQuery();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <>
      <Navigation />
      {tag && (
        <div className={styles.tag}>
          <span>Выбранный тэг: #{tag}</span>
          <Link to="/">
            <DeleteIcon />
          </Link>
        </div>
      )}
      <SortList />

      {isError && <div className={styles.error}>Не удалось загрузить статьи</div>}
      <Grid container spacing={4} sx={{ mt: 0 }}>
        <Grid xs={12} lg={8} item>
          {isLoading
            ? [...Array(3)].map((item, index) => <PostSkeleton key={index} />)
            : posts?.map((post) => (
                <Post
                  id={post._id}
                  key={post._id}
                  {...post}
                  isEditable={isAuth && userData?._id === post.user?._id}
                />
              ))}
        </Grid>
        <Grid
          sx={{
            display: { xs: 'none', lg: 'block' },
          }}
          lg={4}
          item>
          <TagsBlock />
          <CommentsBlock />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
