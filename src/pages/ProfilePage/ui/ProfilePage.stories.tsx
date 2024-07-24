import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ProfilePage from './ProfilePage';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  }
} as Meta<typeof ProfilePage>;

// @ts-ignore
const Template = (args) => <ProfilePage {...args} />;

export const Light: StoryObj<typeof ProfilePage> = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})]

export const Dark: StoryObj<typeof ProfilePage> = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];