import { TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import Button from '../Button/Button';
import styles from './CreateTags.module.scss';

interface CreateTagsProps {
  tags: string[];
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
}

const CreateTags: FC<CreateTagsProps> = ({ tags, addTag, deleteTag }) => {
  const [tag, setTag] = useState('');

  const handleAddTag = () => {
    addTag(tag);
    setTag('');
  };

  const isTags = Boolean(tags?.length);

  return (
    <div className={styles.CreateTags}>
      {isTags && (
        <ul className={styles.list}>
          {tags.map((tag: string) => (
            <li key={tag} onClick={() => deleteTag(tag)}>
              #{tag}
            </li>
          ))}
        </ul>
      )}

      <div className={styles.input}>
        <TextField
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          variant="outlined"
          color="info"
          label="Введите тэг"
        />
        <Button variant="secondary" onClick={handleAddTag}>
          Добавить
        </Button>
      </div>
    </div>
  );
};

export default CreateTags;
