import { getPost } from '../post/service';
import { User, UserDB } from './model';

const data: UserDB[] = [];

export async function getUserPaged(
  page: number,
  limit: number
): Promise<UserDB[]> {
  return data.slice((page - 1) * limit, page * limit);
}

export async function getUser(id: string): Promise<UserDB | null> {
  try {
    const res = await fetch(`http://localhost:8000/toxic/${id}`);

    if (res.ok) {
      const data = await res.json();

      return data;
    }

    console.error(`Error: ${res.status}`);
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function postUser(post: UserDB): Promise<UserDB> {
  data.push(post);
  return post;
}

export async function putUser(
  id: number,
  post: UserDB
): Promise<UserDB | null> {
  throw new Error('Method not implemented.');
  // const index = data.findIndex((p) => p.id === id);
  // if (index !== -1) {
  //   data[index] = post;
  //   return post;
  // }

  // return null;
}

export async function deleteUser(id: number): Promise<UserDB | null> {
  throw new Error('Method not implemented.');
  // const index = data.findIndex((p) => p.id === id);
  // if (index !== -1) {
  //   return data.splice(index, 1)[0];
  // }

  // return null;
}

export async function parseUser(user: UserDB): Promise<User> {
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    avatar: user.avatar,
    description: user.description,

    posts: await Promise.all(user.posts.map((post) => getPost(post))),
    followers: await Promise.all(
      user.followers.map((follow) => getUser(follow))
    ),
    following: await Promise.all(
      user.following.map((follow) => getUser(follow))
    ),
    created_at: new Date(user.createdAt),
  } as User;
}
