import type { Meta, StoryFn } from '@storybook/react';
import { Popover } from './Popover';

export default {
  title: 'shared/Popover',
  component: Popover,
  tags: ['autodocs'],
} as Meta<typeof Popover>;

const Template: StoryFn<typeof Popover> = (args) => <Popover {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
