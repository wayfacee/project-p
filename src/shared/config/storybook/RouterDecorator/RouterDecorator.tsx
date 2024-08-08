import 'app/styles/index.scss';
import { Decorator } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator: Decorator = (StoryComponent) => (
  <BrowserRouter>
    <StoryComponent />
  </BrowserRouter>
);