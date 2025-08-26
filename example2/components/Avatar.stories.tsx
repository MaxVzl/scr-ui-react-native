import { Avatar } from '@scr-ui/components/ui/Avatar';

export default {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
    square: {
      control: { type: 'boolean' },
    },
  },
};

export const Default = {
  args: {
    source: { uri: 'https://xsgames.co/randomusers/avatar.php?g=male' },
  },
};