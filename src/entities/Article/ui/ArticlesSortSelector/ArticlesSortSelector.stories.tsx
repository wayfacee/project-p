import type { Meta, StoryFn } from '@storybook/react';
import { ArticlesSortSelector } from './ArticlesSortSelector';

export default {
  title: 'entities/Article/ArticlesSortSelector',
  component: ArticlesSortSelector,
  tags: ['autodocs'],
} as Meta<typeof ArticlesSortSelector>;

const Template: StoryFn<typeof ArticlesSortSelector> = (args) => <ArticlesSortSelector {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};