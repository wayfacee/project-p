import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { PageLoader } from './PageLoader';

export default {
  title: 'widgets/PageLoader',
  component: PageLoader,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  }
} as Meta<typeof PageLoader>;

const Template = (args: typeof PageLoader) => <PageLoader {...args} />;

export const Light: StoryObj<typeof PageLoader> = Template.bind({});
Light.args = {};

export const Dark: StoryObj<typeof PageLoader> = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];