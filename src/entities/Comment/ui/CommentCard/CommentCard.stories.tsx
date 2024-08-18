import type { Meta, StoryFn } from '@storybook/react';
import { CommentCard } from './CommentCard';
import { Theme } from '@/shared/const/theme';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator/FeatureFlagsDecorator';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  tags: ['autodocs'],
} as Meta<typeof CommentCard>;

const Template: StoryFn<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
);

const primaryArgs = {
  comment: {
    id: '1',
    text: 'hello world',
    user: {
      id: '1',
      username: 'Vasya',
      jsonSettings: {
        isArticlesPageWasOpened: false,
        isFirstVisit: false,
        theme: Theme.VIOLET,
      },
    },
  },
};

export const Primary = Template.bind({});
Primary.args = primaryArgs;

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = primaryArgs;
PrimaryRedesigned.decorators = [
  FeatureFlagsDecorator({ isAppRedesigned: true }),
];

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
