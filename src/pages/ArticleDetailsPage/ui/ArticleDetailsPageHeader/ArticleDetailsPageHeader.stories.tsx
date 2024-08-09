import type { Meta, StoryFn } from '@storybook/react';
import { ArticleDetailsPageHeader } from './ArticleDetailsPageHeader';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'pages/ArticleDetailsPage/ArticleDetailsPageHeader',
  component: ArticleDetailsPageHeader,
  tags: ['autodocs'],
} as Meta<typeof ArticleDetailsPageHeader>;

const Template: StoryFn<typeof ArticleDetailsPageHeader> = (args) => <ArticleDetailsPageHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
Primary.decorators = [StoreDecorator({})]