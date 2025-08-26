import { Tabs } from '@scr-ui/components/ui/Tabs';
import { View } from 'react-native';

export default {
  title: 'Tabs',
  component: Tabs,
  argTypes: {
    routes: {
      control: { type: 'object' },
    },
    scrollable: {
      control: { type: 'boolean' },
    },
  },
};

export const Default = {
  args: {
    routes: [
      {
        value: '1',
        title: 'Tab 1',
        route: () => <View style={{ flex: 1, backgroundColor: '#ff4081' }} />,
      },
      {
        value: '2',
        title: 'Tab 2',
        route: () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />,
      },
    ],
  },
};