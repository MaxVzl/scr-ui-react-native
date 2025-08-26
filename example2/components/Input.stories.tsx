import { Input } from '@scr-ui/components/ui/Input';

export default {
  title: 'Input',
  component: Input,
  argTypes: {
    icon: {
      options: ['Plus', 'Minus', 'X', 'Check'],
      control: { type: 'select' },
    },
  },
};

export const Default = {
  args: {
    placeholder: 'Input',
  },
};