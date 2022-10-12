import { Paper, TextField } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { SimpleMdeReact } from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Rings } from 'react-loader-spinner';

import { useAppSelector } from '../../redux/hooks';
import styles from './CreatePost.module.scss';
import {
  useCreatePostMutation,
  useGetFullPostQuery,
  useUpdatePostMutation,
} from '../../redux/api/postApi';
import Button from '../Button/Button';
import { PostData } from '../../@types/post';
import PreviewUpload from '../PreviewUpload/PreviewUpload';
import CreateTags from '../CreateTags/CreateTags';

const CreatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const { data: post, refetch } = useGetFullPostQuery(id || '', { skip: !id });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isEditing = Boolean(id);

  const [postData, setPostData] = useState<PostData>({
    title: '',
    tags: [],
    imageUrl: '',
  });
  const [text, setText] = useState('');

  const addTag = (tag: string) => {
    if (!postData.tags.includes(tag)) {
      setPostData({ ...postData, tags: [...postData.tags, tag] });
    }
  };

  const deleteTag = (removedTag: string) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== removedTag) });
  };

  const onChange = useCallback((value: string) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    const fields = {
      title: postData.title,
      imageUrl: postData.imageUrl,
      tags: postData.tags,
      text,
      id: id || '',
    };

    isEditing
      ? updatePost(fields)
          .unwrap()
          .then(() => {
            refetch();
            navigate(`/posts/${id}`);
            alert('Статья обновлена');
          })
          .catch((error) => {
            const message = error.data[0].msg || error.data.message;
            setErrorMessage(message);
          })
      : createPost(fields)
          .unwrap()
          .then((payload) => {
            const _id = isEditing ? id : payload._id;
            navigate(`/posts/${_id}`);
            alert('Статья создана');
          })
          .catch((error) => {
            const message = error.data[0].msg || error.data.message;
            setErrorMessage(message);
          });
  };

  const options = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'createPostId',
      },
    };
  }, []);

  useEffect(() => {
    if (post) {
      setPostData({
        title: post.title,
        imageUrl: post.imageUrl || '',
        tags: post.tags,
      });
      setText(post.text);
    }
  }, [post]);

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  if (isEditing && !post) {
    <Rings
      height="200"
      width="200"
      color="#d32f2f"
      radius="6"
      visible={true}
      ariaLabel="rings-loading"
    />;
  }

  return (
    <Paper sx={{ p: '20px' }}>
      <PreviewUpload postData={postData} setPostData={setPostData} />

      <TextField
        color="info"
        className={styles.title}
        variant="outlined"
        label="Заголовок статьи"
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        fullWidth
      />

      <CreateTags tags={postData.tags} addTag={addTag} deleteTag={deleteTag} />

      <SimpleMdeReact
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}

      <div className={styles.buttons}>
        <Button onClick={onSubmit} variant="secondary">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <Link to="/">
          <Button>Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};

export default CreatePost;
