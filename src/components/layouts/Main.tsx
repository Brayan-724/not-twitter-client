import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../Icon';

export interface IMainLayoutProps {
  title: string;
  children?: React.ReactNode;
}

export default function MainLayout(props: IMainLayoutProps) {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>

      <Flex direction="column" h="100vh">
        <Flex
          justify="space-between"
          align="center"
          px={2}
          bg="white"
          color="black"
          borderBottom="1px solid"
          borderColor="gray.200"
          zIndex={10}
        >
          <Box>
            <IconButton aria-label="Menu Button" icon={<Icon name="menu" />} />
          </Box>
          <Flex justify="center">
            <Text fontFamily="'League Gothic'" fontSize="4xl">
              Not Twitter
            </Text>
          </Flex>
          <Box>
            <IconButton
              aria-label="Menu Button"
              icon={<Icon variant="Outlined" name="notifications" />}
            />
          </Box>
        </Flex>

        <Flex direction="column" overflow="auto" h="full" bg="white">
          {props.children}
        </Flex>

        <Flex
          justify="space-around"
          py="3"
          px="1"
          bg="white"
          color="black"
          borderTop="1px solid"
          borderColor="gray.200"
        >
          <IconButton
            aria-label="Home"
            icon={<Icon fontSize="3xl" name="home" color="primary.500" />}
          />
          <IconButton
            aria-label="Search"
            icon={<Icon fontSize="3xl" name="search" variant="Outlined" />}
          />
          <IconButton
            aria-label="Notifications"
            icon={
              <Icon fontSize="3xl" name="notifications" variant="Outlined" />
            }
          />
          <IconButton
            aria-label="Account"
            icon={<Icon fontSize="3xl" name="person" variant="Outlined" />}
          />
        </Flex>
      </Flex>
    </>
  );
}
