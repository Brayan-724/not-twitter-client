import { Button, ButtonProps } from '@chakra-ui/react';
import Icon, { IconProps } from '../Icon';

export interface PostButtonProps extends ButtonProps {
  icon?: string | ButtonProps['leftIcon'] | IconProps;
}

export default function PostButton({ icon, ...props }: PostButtonProps) {
  const leftIcon = icon ? (
    typeof icon === 'string' ? (
      <Icon name={icon} />
    ) : (icon as IconProps).name ? (
      <Icon {...(icon as IconProps)} />
    ) : (
      (icon as ButtonProps['leftIcon'])
    )
  ) : undefined;
  return (
    <Button fontWeight="normal" color="GrayText" leftIcon={leftIcon}>
      {props.children}
    </Button>
  );
}
