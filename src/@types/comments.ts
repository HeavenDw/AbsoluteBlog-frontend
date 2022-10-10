import { UserData } from "./user";

export interface Comment {
  text: string;
  createdAt: string;
  postId: string;
  _id: string;
  user: UserData;
}