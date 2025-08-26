import Icon from '@scr-ui/components/Icon';
import { TabBar } from '@scr-ui/components/ui/TabBar';

export default {
  title: 'TabBar',
  component: TabBar,
};

export const Default = {
  render: () => {
    return (
      <TabBar
        state={{
          index: 0,
          routes: [
            { key: '1', title: 'Tab 1' },
            { key: '2', title: 'Tab 2' },
          ]
        }}
        descriptors={{
          tab1: {
            options: {
              title: 'Tab 1',
              tabBarIcon: ({ color, size }) => (
                <Icon name="X" size={size} color={color} />
              ),
            }
          },
          tab2: {
            options: {
              title: 'Tab 2',
              tabBarIcon: ({ color, size }) => (
                <Icon name="X" size={size} color={color} />
              ),
            }
          }
        }}
        navigation={{
          emit: () => ({}),
          navigate: () => {}
        }}
      />
    )
  }
};