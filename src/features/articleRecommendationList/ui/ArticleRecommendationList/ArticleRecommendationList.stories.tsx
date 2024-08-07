import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { ArticleRecommendationList } from './ArticleRecommendationList';

export default {
  title: 'features/ArticleRecommendationList',
  component: ArticleRecommendationList,
} as Meta<typeof ArticleRecommendationList>;

const Template: StoryFn<typeof ArticleRecommendationList> = (args) => <ArticleRecommendationList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  
};