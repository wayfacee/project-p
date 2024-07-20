import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Sidebar } from './Sidebar';

export default {
  title: 'widgets/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {control: 'color'},
  },
} as Meta<typeof Sidebar>;

const Template = (args: typeof Sidebar) => <Sidebar {...args} />;

export const Light: StoryObj<typeof Sidebar> = Template.bind({});
Light.args = {};

export const Dark: StoryObj<typeof Sidebar> = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];