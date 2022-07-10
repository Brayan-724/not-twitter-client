import { As, Avatar, Box, Flex, IconButton, Text } from '@chakra-ui/react';
import Icon from '../Icon';
import PostButton from './Button';
import { Post as PostModel } from '../../data/post/model';
import { useClock } from '../../hooks/useClock';
import Comment from './Comment';
import Link from '../Link';
export default function Post({
  post,
  link = false,
}: {
  post: PostModel;
  link?: boolean;
}) {
  const timeAgo = useClock(post.createdAt);
  const as = (elm: As = Box): As => (link ? Link : elm);
  const props = () =>
    link
      ? {
          to: `/tweet/T${post.id}`,
          cursor: 'pointer',
        }
      : {};

  return (
    <Flex direction="column">
      <Flex
        py={3}
        px={4}
        bg="white"
        color="black"
        gap={2}
        borderBottom="1px solid"
        borderColor="gray.200"
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
              {post.author.name}
              <Text as="span" color="GrayText">
                @{post.author.username}
              </Text>
            </Text>
            <Text color="GrayText" ml="1ch">
              • {timeAgo}
            </Text>
            <IconButton
              ml="auto"
              pl="1ch"
              aria-label="post menu"
              icon={<Icon name="more_horiz" color="GrayText" />}
            />
          </Flex>

          <Text as={as()} {...props()} whiteSpace="pre-line">
            {post.content}
          </Text>

          <Flex mt="2" justify="space-between" maxW="350px">
            <PostButton icon="chat_bubble_outline">
              {post.comments.length}
            </PostButton>
            <PostButton icon="cached">{post.retweets}</PostButton>
            <PostButton
              icon="favorite_border"
              onClick={(e) => {
                e.preventDefault();
                console.log('like');
              }}
            >
              {post.likes}
            </PostButton>
            <PostButton icon={{ name: 'file_upload', variant: 'Outlined' }} />
          </Flex>
        </Box>
      </Flex>
      <Flex direction="column">
        {post.comments.slice(0, 5).map((comment, i) => (
          <Comment
            key={comment.id}
            link
            comment={comment}
            isLast={post.comments.length - 1 <= i}
          />
        ))}
      </Flex>
    </Flex>
  );
}
