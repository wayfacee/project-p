import type { Meta, StoryFn } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';
import { Sidebar } from './Sidebar';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'widgets/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Sidebar>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Template: StoryFn<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  user: { authData: {} }
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  user: { authData: {} }
})];

export const NoAuth = Template.bind({});
NoAuth.args = {};
NoAuth.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  user: {}
})];