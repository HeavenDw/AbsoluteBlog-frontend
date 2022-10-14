import React, { ChangeEvent, useEffect, useRef } from 'react';
import { Avatar } from '@mui/material';

import { useUploadImageMutation } from '../../redux/api/uploadApi';
import { useAuthMeQuery, useSetAvatarMutation } from '../../redux/api/userApi';
import styles from './UserInfo.module.scss';

const UserInfo = () => {
  const { data: userData, refetch } = useAuthMeQuery();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [setAvatar] = useSetAvatarMutation();
  const [uploadImage] = useUploadImageMutation();

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      formData.append('image', file);
      uploadImage(formData)
        .unwrap()
        .then((res) => {
          setAvatar({
            imageUrl: res.url,
          });
          refetch();
        })
        .catch((error) => alert(error.data.message));
    }
    event.target.value = '';
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className={styles.root}>
      <input ref={inputFileRef} hidden type="file" onChange={handleChangeFile} />
      <Avatar
        src={
          userData?.avatarUrl
            ? 'https://absolute-blog.herokuapp.com' + userData.avatarUrl
            : 'https://absolute-blog.herokuapp.com/uploads/no-avatar.png'
        }
        alt={userData?.nickname}
        onClick={() => inputFileRef?.current?.click()}
        onChange={handleChangeFile}
        sx={{ cursor: 'pointer' }}
      />
      <span className={styles.nickname}>{userData?.nickname}</span>
    </div>
  );
};

export default UserInfo;
