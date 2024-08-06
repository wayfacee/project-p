import type { Meta, StoryFn } from '@storybook/react';
import { ListBox } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  tags: ['autodocs'],
} as Meta<typeof ListBox>;

const Template: StoryFn<typeof ListBox> = (args) => <ListBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};