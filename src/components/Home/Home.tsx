import React from 'react';
import { Grid } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

import { useGetPostsQuery } from '../../redux/api/postApi';
import { useAuthMeQuery } from '../../redux/api/userApi';
import Post from '../Post/Post';
import { PostSkeleton } from '../Post/PostSekeleton';
import TagsBlock from '../TagsBlock/TagsBlock';
import CommentsBlock from '../CommentsBlock/CommentsBlock';

const Home = () => {
  const { tag, sortBy } = useParams();
  const [tab, setTab] = React.useState(0);
  const { data: posts, isLoading } = useGetPostsQuery({ tag: tag || '', sortBy: sortBy || '' });
  const { data: userData } = useAuthMeQuery();

  return (
    <>
      {tag && <div>#{tag}</div>}
      <ul>
        <li className={tab === 0 ? 'active' : ''}>
          <Link to="/" onClick={() => setTab(0)}>
            Новые
          </Link>
        </li>
        <li className={tab === 1 ? 'active' : ''}>
          <Link to="/sortBy/popular" onClick={() => setTab(1)}>
            Популярные
          </Link>
        </li>
      </ul>
      <Grid container spacing={4}>
        <Grid xs={8} item>
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
        </Grid>
        <Grid xs={4} item>
          <TagsBlock />
          <CommentsBlock />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
