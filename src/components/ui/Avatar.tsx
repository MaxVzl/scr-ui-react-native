import { Image, ImageProps, StyleSheet } from "react-native";

type AvatarSize = 'large' | 'medium' | 'small';

type AvatarProps = ImageProps & {
  size?: AvatarSize;
  square?: boolean;
}

export const Avatar = ({
  size = 'medium',
  square = false,
  ...props
}: AvatarProps) => {
  return (
    <Image
      style={[styles.avatar, styles[size], square && styles.square]}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
  },

  large: {
    width: 100,
    height: 100,
  },
  medium: {
    width: 50,
    height: 50,
  },
  small: {
    width: 30,
    height: 30,
  },

  square: {
    borderRadius: 10,
  }
});