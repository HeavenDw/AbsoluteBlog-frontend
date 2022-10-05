import React from 'react';

import { useGetPostsQuery } from '../../redux/api/postApi';
import { useAuthMeQuery } from '../../redux/api/userApi';
import Post from '../Post/Post';
import { PostSkeleton } from '../Post/PostSekeleton';

const Home = () => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const { data: userData } = useAuthMeQuery();

  return (
    <>
      {isLoading
        ? [...Array(3)].map((item, index) => <PostSkeleton key={index} />)
        : posts?.map((post) => (
            <Post
              id={post._id}
              commentsCount={3}
              key={post._id}
              {...post}
              isEditable={userData?._id === post.user?._id}
            />
          ))}
    </>
  );
};

export default Home;
