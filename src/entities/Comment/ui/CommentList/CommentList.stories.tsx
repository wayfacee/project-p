import type { Meta, StoryFn } from '@storybook/react';
import { CommentList } from './CommentList';

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  tags: ['autodocs'],
} as Meta<typeof CommentList>;

const Template: StoryFn<typeof CommentList> = (args) => (
  <CommentList {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  comments: [
    {
      id: '1',
      text: 'hello world',
      user: { id: '1', username: 'Vasya' },
    },
    {
      id: '2',
      text: 'hello',
      user: { id: '2', username: 'Petya' },
    },
  ],
};
