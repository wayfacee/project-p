import type { Meta, StoryFn } from '@storybook/react';
import ArticlesPage from './ArticlesPage';

export default {
  title: 'shared/ArticlesPage',
  component: ArticlesPage,
  tags: ['autodocs'],
} as Meta<typeof ArticlesPage>;

const Template: StoryFn<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};