import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeSwitcher } from './ThemeSwitcher';

export default {
  title: 'widgets/ThemeSwitcher',
  component: ThemeSwitcher,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  }
} as Meta<typeof ThemeSwitcher>;

// @ts-ignore
const Template = (args) => <ThemeSwitcher {...args} />;

export const Light: StoryObj<typeof ThemeSwitcher> = Template.bind({});
Light.args = {};

export const Dark: StoryObj<typeof ThemeSwitcher> = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];