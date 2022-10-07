import { Button, Paper, TextField } from '@mui/material';
import React from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { SimpleMdeReact } from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import { useUploadImageMutation } from '../../redux/api/uploadApi';
import { useAppSelector } from '../../redux/hooks';
import styles from './CreatePost.module.css';
import {
  useCreatePostMutation,
  useGetFullPostQuery,
  useUpdatePostMutation,
} from '../../redux/api/postApi';

interface postData {
  title: string;
  imageUrl: string;
  tags: string[];
}

const CreatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const [uploadImage] = useUploadImageMutation();
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const { data: post, refetch } = useGetFullPostQuery(id || '', { skip: !id });
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [tag, setTag] = React.useState('');
  const isEditing = Boolean(id);

  const [postData, setPostData] = React.useState<postData>({
    title: '',
    tags: [],
    imageUrl: '',
  });
  const [text, setText] = React.useState('');

  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      formData.append('image', file);
      uploadImage(formData)
        .unwrap()
        .then((res) => {
          setPostData({ ...postData, imageUrl: res.url });
        })
        .catch((error) => alert(error.data.message));
    }
    event.target.value = '';
  };

  const addTag = () => {
    if (!postData.tags.includes(tag)) {
      setPostData({ ...postData, tags: [...postData.tags, tag] });
    }
    setTag('');
  };

  const onClickRemoveImage = () => {
    setPostData({ ...postData, imageUrl: '' });
  };

  const onChange = React.useCallback((value: string) => {
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
            setErrorMessage(error.data[0].msg);
          })
      : createPost(fields)
          .unwrap()
          .then((payload) => {
            const _id = isEditing ? id : payload._id;
            navigate(`/posts/${_id}`);
            alert('Статья создана');
          })
          .catch((error) => {
            setErrorMessage(error.data[0].msg);
          });
  };

  const options = React.useMemo(() => {
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

  React.useEffect(() => {
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
    <div>Loader</div>;
  }
  return (
    <Paper sx={{ p: '20px' }}>
      <Button onClick={() => inputFileRef?.current?.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} hidden type="file" onChange={handleChangeFile} />
      {postData.imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${postData.imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}

      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        fullWidth
      />

      {postData.tags && (
        <ul>
          {postData.tags.map((tag: string) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      )}

      <TextField
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        variant="standard"
        placeholder="Введите тэг"
        fullWidth
      />
      <Button onClick={addTag}>Добавить тег</Button>

      <SimpleMdeReact
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}

      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};

export default CreatePost;
