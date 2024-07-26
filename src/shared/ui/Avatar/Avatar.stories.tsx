import type { Meta, StoryFn } from '@storybook/react';
import { Avatar } from './Avatar';
// тк сторибуку понадоб. время для загрузки
import AvatarImg from './AvatarImg.jpg';

export default {
  title: 'shared/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
  },
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args) => <Avatar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 150,
  src: AvatarImg,
};

export const Small = Template.bind({});
Primary.args = {
  size: 50,
  src: AvatarImg,
};