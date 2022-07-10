import { Box, Flex, IconButton, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import MainLayout from '../components/layouts/Main';
import Post from '../components/Posts';
import { Post as PostModel } from '../data/post/model';
import { getPostPaged, parsePost } from '../data/post/service';

export default function Index() {
  const [posts, setPosts] = useState<PostModel[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostPaged(1, 25)
      .then((posts) => Promise.all(posts.map((post) => parsePost(post))))
      .then((posts) => setPosts(posts))
      .catch((e) => {
        console.error(e);
        setPosts(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <MainLayout title="Home">
      {loading && (
        <Flex justify="center" py="4" h="full">
          <Spinner color="black" size="md" />
        </Flex>
      )}

      {!loading &&
        posts !== null &&
        (posts.length === 0 ? (
          <Flex justify="center" py="4" h="full">
            <Text color="GrayText" fontSize="xl" userSelect="none">
              No data
            </Text>
          </Flex>
        ) : (
          posts.map((post: PostModel, i) => (
            <Post
              key={post.id}
              link
              post={{
                ...post,
                createdAt: new Date(post.createdAt),
              }}
            />
          ))
        ))}

      {!loading && posts === null && (
        <Flex justify="center" py="4" h="full">
          <Text color="red" fontSize="xl" userSelect="none">
            Error fetching posts
          </Text>
        </Flex>
      )}
    </MainLayout>
  );
}
