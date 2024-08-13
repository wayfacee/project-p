import { Meta, StoryFn } from '@storybook/react';

import { ArticlesSortSelector } from './ArticlesSortSelector';

export default {
  title: 'features/ArticlesSortSelector',
  component: ArticlesSortSelector,
} as Meta<typeof ArticlesSortSelector>;

const Template: StoryFn<typeof ArticlesSortSelector> = (args) => (
  <ArticlesSortSelector {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
