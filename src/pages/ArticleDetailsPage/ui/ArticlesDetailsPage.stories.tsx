import type { Meta, StoryFn } from '@storybook/react';
import ArticlesDetailsPage from './ArticlesDetailsPage';

export default {
  title: 'shared/ArticlesDetailsPage',
  component: ArticlesDetailsPage,
  tags: ['autodocs'],
} as Meta<typeof ArticlesDetailsPage>;

const Template: StoryFn<typeof ArticlesDetailsPage> = (args) => <ArticlesDetailsPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};