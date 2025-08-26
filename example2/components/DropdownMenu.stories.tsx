import { Button } from '@scr-ui/components/ui/Button';
import { dropdownMenu } from '@scr-ui/components/ui/DropdownMenu';

export default {
  title: 'DropdownMenu',
  component: Button,
};

export const Default = {
  args: {
    title: 'DropdownMenu',
    onPress: () => {
      dropdownMenu.open([
        { label: 'Item 1', action: () => {}, icon: 'Plus' },
        { label: 'Item 4', action: () => {}, spaced: true },
        { label: 'Item 5', action: () => {}, icon: 'Trash2', isError: true, spaced: true },
      ]);
    },
  },
};