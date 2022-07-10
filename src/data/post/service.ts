import { getUser } from '../user/service';
import { Post, PostDB } from './model';

const data: PostDB[] = [];

export async function getComments(postId: string): Promise<PostDB[]> {
  try {
    const res = await fetch('http://localhost:8000/tweets');

    if (res.ok) {
      const data = await res.json();

      console.log(data);

      return data;
    }

    console.error(`Error: ${res.status}`);
    return [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getPostPaged(
  page: number,
  limit: number
): Promise<PostDB[]> {
  const data = await getComments('');
  console.log(data);

  return data
    .filter((post) => post.parentId === null)
    .reverse()
    .slice((page - 1) * limit, page * limit);
}

export async function getPost(id: string): Promise<PostDB | undefined> {
  return data.find((post) => post.id === id);
}

export async function postPost(post: PostDB): Promise<PostDB> {
  data.push(post);
  return post;
}

export async function putPost(
  id: string,
  post: PostDB
): Promise<PostDB | undefined> {
  const index = data.findIndex((p) => p.id === id);
  if (index !== -1) {
    data[index] = post;
    return post;
  }

  return undefined;
}

export async function deletePost(id: string): Promise<PostDB | undefined> {
  const index = data.findIndex((p) => p.id === id);
  if (index !== -1) {
    return data.splice(index, 1)[0];
  }

  return undefined;
}

export async function parsePost(post: PostDB): Promise<Post> {
  return {
    id: post.id,
    parent: post.parentId !== null ? await getPost(post.parentId) : undefined,
    author: await getUser(post.toxicId),
    content: post.content,
    comments: [],
    // comments: await Promise.all(post.comments.map((id) => getPost(id))),
    retweets: post.retweets,
    likes: post.likes,
    createdAt: new Date(post.createdAt),
  } as Post;
}
