import React, { FC } from 'react';
import { Avatar } from '@mui/material';
import TimeAgo from 'javascript-time-ago';
import ru from 'javascript-time-ago/locale/ru.json';
import ReactTimeAgo from 'react-time-ago';

import styles from './PostUserInfo.module.scss';
import { UserData } from '../../@types/user';

TimeAgo.addLocale(ru);

interface PostUserInfoProps {
  userData: UserData;
  date: string;
}

const PostUserInfo: FC<PostUserInfoProps> = ({ userData, date }) => {
  const formatedDate = Date.parse(date);

  return (
    <ul className={styles.root}>
      <li>
        <Avatar
          src={
            userData.avatarUrl
              ? 'https://absolute-blog.herokuapp.com' + userData.avatarUrl
              : 'https://absolute-blog.herokuapp.com/uploads/no-avatar.png'
          }
        />
      </li>
      <li>{userData.nickname}</li>
      <li>
        <ReactTimeAgo date={formatedDate} locale="ru-Ru" timeStyle="round" />
      </li>
    </ul>
  );
};

export default PostUserInfo;
