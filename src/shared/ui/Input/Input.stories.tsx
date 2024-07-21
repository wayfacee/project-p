import type { Meta, StoryObj } from '@storybook/react';
import 'app/styles/index.scss'
import { Input } from './Input';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
  title: 'shared/Input',
  component: Input,
  tags: ['autodocs'],
} as Meta<typeof Input>;

const Template = (args: StoryObj<typeof Input>) => <Input {...args} />;

export const Primary: StoryObj<typeof Input> = Template.bind({});
Primary.args = {
  placeholder: 'text',
  value: '1234',
}

export const Dark: StoryObj<typeof Input> = Template.bind({});
Dark.args = {
  placeholder: 'text',
  value: '1234',
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]