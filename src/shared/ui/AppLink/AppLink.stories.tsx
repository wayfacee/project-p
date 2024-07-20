import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { AppLink, AppLinkTheme } from './AppLink';

export default {
  title: 'widgets/AppLink',
  component: AppLink,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {control: 'color'},
  },
  args: {
    to: '/',
  }
} as Meta<typeof AppLink>;

const Template = (args: typeof AppLink) => <AppLink to='/' {...args} />;

export const Primary: StoryObj<typeof AppLink> = Template.bind({});
Primary.args = {
  children: 'text',
  theme: AppLinkTheme.PRIMARY,
};

export const Secondary: StoryObj<typeof AppLink> = Template.bind({});
Secondary.args = {
  children: 'text',
  theme: AppLinkTheme.SECONDARY,
};

// -------------------
export const PrimaryDark: StoryObj<typeof AppLink> = Template.bind({});
PrimaryDark.args = {
  children: 'text',
  theme: AppLinkTheme.PRIMARY,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SecondaryDark: StoryObj<typeof AppLink> = Template.bind({});
SecondaryDark.args = {
  children: 'text',
  theme: AppLinkTheme.SECONDARY,
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];