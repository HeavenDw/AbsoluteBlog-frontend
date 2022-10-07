import React, { useEffect, useRef, useState } from 'react';
import { Avatar } from '@mui/material';

import { useUploadImageMutation } from '../../redux/api/uploadApi';
import { useAuthMeQuery, useSetAvatarMutation } from '../../redux/api/userApi';

const UserInfo = () => {
  const { data: userData, refetch } = useAuthMeQuery();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [setAvatar] = useSetAvatarMutation();
  const [uploadImage] = useUploadImageMutation();

  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
    <>
      <span>{userData?.nickname}</span>
      <input ref={inputFileRef} hidden type="file" onChange={handleChangeFile} />
      <Avatar
        src={
          userData?.avatarUrl
            ? 'http://localhost:4444' + userData.avatarUrl
            : 'http://localhost:4444/uploads/no-avatar.png'
        }
        alt={userData?.nickname}
        onClick={() => inputFileRef?.current?.click()}
        onChange={handleChangeFile}
      />
    </>
  );
};

export default UserInfo;
