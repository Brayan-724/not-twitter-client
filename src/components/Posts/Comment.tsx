import {
  As,
  Avatar,
  Box,
  Flex,
  IconButton,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Post, PostDB } from '../../data/post/model';
import { parsePost } from '../../data/post/service';
import { useClock } from '../../hooks/useClock';
import Icon from '../Icon';
import Link from '../Link';
import PostButton from './Button';

export default function Comment({
  comment: postDB,
  isLast = false,
  link = false,
}: {
  comment: PostDB;
  isLast?: boolean;
  link?: boolean;
}) {
  const [post, setPost] = useState<Post | null>(null);
  const timeAgo = useClock(new Date(postDB.createdAt));
  const [loading, setLoading] = useState(false);

  const as = (elm: As = Box): As => (link ? Link : elm);
  const props = () =>
    link
      ? {
          to: `/tweet/T${postDB.id}`,
          cursor: 'pointer',
        }
      : {};

  useEffect(() => {
    parsePost(postDB)
      .then((post) => setPost(post))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Flex justify="space-between" w="full">
      <Flex
        pl="5"
        borderBottom={isLast ? '1px solid' : ''}
        borderColor={isLast ? 'gray.200' : ''}
      >
        <Flex borderRight="2px solid" borderColor="#ccc" h="100%" />
      </Flex>
      <Flex
        py={3}
        px={4}
        bg="white"
        color="black"
        gap={2}
        borderBottom="1px solid"
        borderColor="gray.200"
        w="full"
      >
        <Box>
          <Avatar />
        </Box>
        <Box w="full" overflow="hidden">
          <Flex whiteSpace="nowrap" align="center">
            <Text
              as="span"
              maxW="full"
              overflow="hidden"
              textOverflow="ellipsis"
              fontWeight="bold"
            >
              <SkeletonLoading isLoading={loading} data={post}>
                {(post) => post.author.name}
              </SkeletonLoading>
              <Text as="span" color="GrayText">
                <SkeletonLoading isLoading={loading} data={post}>
                  {(post) => ` @${post.author.username}`}
                </SkeletonLoading>
              </Text>
            </Text>
            <Text as="span" color="GrayText" ml="1ch">
              <SkeletonLoading isLoading={loading} data={post}>
                {(post) => `• ${timeAgo}`}
              </SkeletonLoading>
            </Text>
            <IconButton
              ml="auto"
              pl="1ch"
              aria-label="post menu"
              icon={<Icon name="more_horiz" color="GrayText" />}
            ></IconButton>
          </Flex>
          <Text as={as("p")} {...props()} whiteSpace="pre-line">
            <SkeletonLoading isLoading={loading} data={post}>
              {(post) => post.content}
            </SkeletonLoading>
          </Text>
          <Flex mt="2" justify="space-between" maxW="350px">
            <PostButton icon="chat_bubble_outline">
              <SkeletonLoading isLoading={loading} data={post}>
                {(post) => post.comments.length}
              </SkeletonLoading>
            </PostButton>
            <PostButton icon="cached">
              <SkeletonLoading isLoading={loading} data={post}>
                {(post) => post.retweets}
              </SkeletonLoading>
            </PostButton>
            <PostButton icon="favorite_border">
              <SkeletonLoading isLoading={loading} data={post}>
                {(post) => post.likes}
              </SkeletonLoading>
            </PostButton>
            <PostButton icon={{ name: 'file_upload', variant: 'Outlined' }} />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}

function SkeletonLoading<T>({
  isLoading,
  data,
  children,
}: {
  isLoading: boolean;
  data: T;
  children: (d: Exclude<T, null | undefined>) => React.ReactNode;
}) {
  return (
    <>
      {isLoading || data === null || data === undefined ? (
        <Skeleton
          as="span"
          isLoaded={false}
          color="gray.200"
          bg="gray.100"
          h="20px"
          w="100%"
        />
      ) : (
        children(data as Exclude<T, null | undefined>)
      )}
    </>
  );
}
