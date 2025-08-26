import { IconButton } from '@scr-ui/components/ui/IconButton';

export default {
  title: 'IconButton',
  component: IconButton,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'error', 'muted'],
      control: { type: 'radio' },
    },
    size: {
      options: ['large', 'medium', 'small'],
      control: { type: 'radio' },
    },
    icon: {
      options: ['Plus', 'Minus', 'X', 'Check'],
      control: { type: 'select' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export const Default = {
  args: {
    icon: 'Plus',
  },
};