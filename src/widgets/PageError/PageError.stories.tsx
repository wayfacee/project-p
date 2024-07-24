import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { PageError } from './PageError';

export default {
  title: 'widgets/PageError',
  component: PageError,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: {control: 'color'},
  },
} as Meta<typeof PageError>;

// @ts-ignore
const Template = (args) => <PageError {...args} />;

export const Light: StoryObj<typeof PageError> = Template.bind({});
Light.args = {};

export const Dark: StoryObj<typeof PageError> = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];