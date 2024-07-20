import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import MainPage from './MainPage';

export default {
  title: 'pages/MainPage',
  component: MainPage,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  }
} as Meta<typeof MainPage>;

const Template = (args: typeof MainPage) => <MainPage {...args} />;

export const Light: StoryObj<typeof MainPage> = Template.bind({});
Light.args = {};

export const Dark: StoryObj<typeof MainPage> = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];