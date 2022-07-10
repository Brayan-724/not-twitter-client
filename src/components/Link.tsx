import { Box, BoxProps } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

export interface ILinkProps extends BoxProps {
  to: string;
  children?: React.ReactNode;
}

export default function Link({ to, children, ...props }: ILinkProps) {
  const navigate = useNavigate();

  return (
    <Box onClick={() => navigate(to)} {...props}>
      {children}
    </Box>
  );
}
