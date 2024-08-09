import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { ArticleRecommendationList } from './ArticleRecommendationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
// import withMock from 'storybook-addon-mock';
import { Article } from '@/entities/Article';

export default {
  title: 'features/ArticleRecommendationList',
  component: ArticleRecommendationList,
  // decorators: [withMock],
} as Meta<typeof ArticleRecommendationList>;

const Template: StoryFn<typeof ArticleRecommendationList> = (args) => <ArticleRecommendationList {...args} />;

const article: Article = {
  id: '1',
  img: '',
  createdAt: '',
  views: 123,
  user: { id: '1', username: '123' },
  blocks: [],
  type: [],
  title: '123',
  subtitle: 'asfsa',
};

export const Normal = Template.bind({});
Normal.args = {
};
Normal.decorators = [StoreDecorator({})]
Normal.parameters = {
  mockData: [
    {
      url: __API__ + '/articles?_limit=3',
      method: 'GET',
      status: 200,
      response: [
        { ...article, id: '1' },
        { ...article, id: '2' },
        { ...article, id: '3' },
      ],
    },
  ]
}