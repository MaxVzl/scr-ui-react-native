import { PasswordInput } from '@scr-ui/components/ui/PasswordInput';

export default {
  title: 'PasswordInput',
  component: PasswordInput,
  argTypes: {
    icon: {
      options: ['Plus', 'Minus', 'X', 'Check'],
      control: { type: 'select' },
    },
  },
};

export const Default = {
  args: {
    placeholder: 'PasswordInput',
  },
};