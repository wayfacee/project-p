import type { Meta, StoryFn } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { NotFoundPage } from './NotFoundPage';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';

export default {
  title: 'pages/NotFoundPage',
  component: NotFoundPage,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  }
} as Meta<typeof NotFoundPage>;

const Template: StoryFn<typeof NotFoundPage> = (args) => <NotFoundPage {...args} />;

export const Light = Template.bind({});
Light.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];