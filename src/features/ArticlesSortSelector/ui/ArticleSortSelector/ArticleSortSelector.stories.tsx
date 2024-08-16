import { Meta, StoryFn } from '@storybook/react';

import { ArticleSortSelector } from './ArticleSortSelector';

export default {
  title: 'features/ArticlesSortSelector',
  component: ArticleSortSelector,
} as Meta<typeof ArticleSortSelector>;

const Template: StoryFn<typeof ArticleSortSelector> = (args) => (
  <ArticleSortSelector {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
