import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import AboutPage from './AboutPage';

export default {
  title: 'pages/AboutPage',
  component: AboutPage,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  }
} as Meta<typeof AboutPage>;

const Template = (args: typeof AboutPage) => <AboutPage {...args} />;

export const Light: StoryObj<typeof AboutPage> = Template.bind({});
Light.args = {};

export const Dark: StoryObj<typeof AboutPage> = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];