import React, { ChangeEvent, FC, useRef } from 'react';

import { PostData } from '../../@types/post';
import { useUploadImageMutation } from '../../redux/api/uploadApi';
import Button from '../Button/Button';
import styles from './PreviewUpload.module.scss';

interface previewUploadProps {
  postData: PostData;
  setPostData: ({}: PostData) => void;
}

const PreviewUpload: FC<previewUploadProps> = ({ postData, setPostData }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [uploadImage, { isError: isUploadError }] = useUploadImageMutation();

  const handleChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    if (event.currentTarget.files) {
      const file = event.currentTarget.files[0];
      formData.append('image', file);
      uploadImage(formData)
        .unwrap()
        .then((res) => {
          setPostData({ ...postData, imageUrl: res.url });
        });
    }
    event.target.value = '';
  };

  const onClickRemoveImage = () => {
    setPostData({ ...postData, imageUrl: '' });
  };

  return (
    <div className={styles.root}>
      <div className={styles.buttons}>
        <Button onClick={() => inputFileRef?.current?.click()} variant="secondary">
          Загрузить превью
        </Button>
        {isUploadError && <div>Не удалось загрузить картинку</div>}
        {postData.imageUrl && (
          <Button variant="red" onClick={onClickRemoveImage}>
            Удалить
          </Button>
        )}

        <input ref={inputFileRef} hidden type="file" onChange={handleChangeFile} />
      </div>

      {postData.imageUrl && (
        <div className={styles.image}>
          <img
            className={styles.image}
            src={`http://localhost:4444${postData.imageUrl}`}
            alt="Uploaded"
          />
        </div>
      )}
    </div>
  );
};

export default PreviewUpload;
