import type { Meta, StoryFn } from '@storybook/react';
import { AvatarDropdown } from './AvatarDropdown';

export default {
  title: 'features/AvatarDropdown',
  component: AvatarDropdown,
  tags: ['autodocs'],
} as Meta<typeof AvatarDropdown>;

const Template: StoryFn<typeof AvatarDropdown> = (args) => <AvatarDropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};