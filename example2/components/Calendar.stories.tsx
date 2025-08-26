import { Calendar } from '@scr-ui/components/ui/Calendar';

export default {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    value: {
      control: { type: 'date' },
    },
    onChange: {
      action: 'onChange',
    },
  },
};

export const Default = {
  args: {
    value: new Date(),
    onChange: () => {},
  },
};