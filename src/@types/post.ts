import { UserData } from "./user";

export interface Post {
  title: string;
  text: string;
  _id: string;
  viewsCount: number;
  commentsCount: number;
  createdAt: string;
  tags: string[];
  imageUrl?: string;
  user: UserData;
}

export interface PostData {
  title: string;
  imageUrl: string;
  tags: string[];
}