import { DateTimePicker } from '@scr-ui/components/ui/DateTimePicker';

export default {
  title: 'DateTimePicker',
  component: DateTimePicker,
  argTypes: {
    mode: {
      options: ['date', 'time', 'datetime'],
      control: { type: 'radio' },
    },
  },
};

export const Default = {
  args: {
    placeholder: 'DateTimePicker',
  },
};