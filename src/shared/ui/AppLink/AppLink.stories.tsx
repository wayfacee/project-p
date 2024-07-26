import type { Meta, StoryFn } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { AppLink, AppLinkTheme } from './AppLink';

export default {
  title: 'shared/AppLink',
  component: AppLink,
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
    to: '/',
  }
} as Meta<typeof AppLink>;

// @ts-ignore
const Template: StoryFn<typeof AppLink> = (args) => <AppLink to='/' {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'text',
  theme: AppLinkTheme.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'text',
  theme: AppLinkTheme.SECONDARY,
};

// -------------------
export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'text',
  theme: AppLinkTheme.PRIMARY,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
  children: 'text',
  theme: AppLinkTheme.SECONDARY,
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];