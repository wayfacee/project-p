import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { Navbar } from './Navbar';

export default {
  title: 'widgets/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: {control: 'color'},
  },
} as Meta<typeof Navbar>;

const Template = (args: typeof Navbar) => <Navbar {...args} />;

export const Light: StoryObj<typeof Navbar> = Template.bind({});
Light.args = {
}

export const Dark: StoryObj<typeof Navbar> = Template.bind({});
Dark.args = {
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];