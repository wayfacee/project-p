import type { Meta, StoryFn } from '@storybook/react';
import { StarRating } from './StarRating';

export default {
  title: 'shared/StarRating',
  component: StarRating,
  tags: ['autodocs'],
} as Meta<typeof StarRating>;

const Template: StoryFn<typeof StarRating> = (args) => <StarRating {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  size: 50
};