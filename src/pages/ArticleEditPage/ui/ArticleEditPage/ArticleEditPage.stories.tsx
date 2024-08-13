import type { Meta, StoryFn } from '@storybook/react';
import ArticleEditPage from './ArticleEditPage';

export default {
  title: 'pages/ArticleEditPage/ArticleEditPage',
  component: ArticleEditPage,
  tags: ['autodocs'],
} as Meta<typeof ArticleEditPage>;

const Template: StoryFn<typeof ArticleEditPage> = (args) => (
  <ArticleEditPage {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
