/** @format */

import { Text, TextProps } from '@chakra-ui/react';

export interface IconProps extends TextProps {
  name: string;
  variant?: 'Filled' | 'Outlined' | 'Rounded' | 'Sharp';
}

export default function Icon({ name, variant, ...props }: IconProps) {
  return (
    <Text
      as="span"
      fontFamily={`'Material Icons${variant ? ' ' + variant : ''}'`}
      lineHeight="1"
      fontSize="24px"
      {...props}
    >
      {name}
    </Text>
  );
}
