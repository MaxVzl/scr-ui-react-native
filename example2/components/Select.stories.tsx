import { Select } from '@scr-ui/components/ui/Select';

export default {
  title: 'Select',
  component: Select,
  argTypes: {
    searchable: {
      control: { type: 'boolean' },
    },
  },
};

export const Default = {
  args: {
    placeholder: 'Select',
    items: [
      { value: '1', label: 'Item 1' },
      { value: '2', label: 'Item 2' },
      { value: '3', label: 'Item 3' },
    ],
  },
};