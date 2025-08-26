import { SearchInput } from '@scr-ui/components/ui/SearchInput';

export default {
  title: 'SearchInput',
  component: SearchInput,
  argTypes: {
    bottomSheet: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
  },
};

export const Default = {
  args: {
    placeholder: 'SearchInput',
  },
};