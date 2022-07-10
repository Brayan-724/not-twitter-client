import { PostDB } from "../post/model";

export type UserDB = {
  id: string;
  name: string;
  username: string;
  avatar: string;

  description: string;

  posts: string[];
  followers: string[];
  following: string[];

  createdAt: string;
}

export type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;

  description: string;

  posts: PostDB[];
  followers: UserDB[];
  following: UserDB[];

  created_at: Date;
}