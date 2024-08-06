import type { Meta, StoryFn } from '@storybook/react';
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';

export default {
  title: 'pages/Article/ArticleDetailsPageHeader',
  component: ArticleDetailsPageHeader,
  tags: ['autodocs'],
} as Meta<typeof ArticleDetailsPageHeader>;

const Template: StoryFn<typeof ArticleDetailsPageHeader> = (args) => <ArticleDetailsPageHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};