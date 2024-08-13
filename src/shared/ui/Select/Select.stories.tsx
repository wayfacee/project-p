import type { Meta, StoryFn } from '@storybook/react';
import { Select } from './Select';

export default {
  title: 'shared/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {},
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'label',
  options: [
    { value: '123', content: 'Text 1' },
    { value: '456', content: 'Text 2' },
  ],
};
