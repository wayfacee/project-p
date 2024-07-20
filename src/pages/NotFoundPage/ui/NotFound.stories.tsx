import type { Meta, StoryObj } from '@storybook/react';
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

const Template = (args: typeof NotFoundPage) => <NotFoundPage {...args} />;

export const Light: StoryObj<typeof NotFoundPage> = Template.bind({});
Light.args = {};

export const Dark: StoryObj<typeof NotFoundPage> = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator (Theme.DARK)];