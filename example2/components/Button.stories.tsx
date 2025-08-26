import { Button } from '@scr-ui/components/ui/Button';

export default {
  title: 'Button',
  component: Button,
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
    spaced: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export const Default = {
  args: {
    title: 'Button',
  },
};