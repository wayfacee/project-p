import type { Meta, StoryFn } from '@storybook/react';
import { CommentCard } from './CommentCard';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  tags: ['autodocs'],
} as Meta<typeof CommentCard>;

const Template: StoryFn<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  comment: {
    id: '1',
    text: 'hello world',
    user: { id: '1', username: 'Vasya' }
  },
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};