import { UserDB } from '../user/model';

export type PostDB = {
  id: string;
  parentId: string | null;
  toxicId: string;

  content: string;

  comments: number[];
  retweets: number;
  likes: number;

  createdAt: number;
};

export type Post = {
  id: string;
  parent: PostDB | null;
  author: UserDB;

  content: string;

  comments: PostDB[];
  retweets: number;
  likes: number;

  createdAt: Date;
};
