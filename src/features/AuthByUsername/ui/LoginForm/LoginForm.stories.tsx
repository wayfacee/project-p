import type { Meta, StoryObj } from '@storybook/react';
import 'app/styles/index.scss'
import { LoginForm } from './LoginForm';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'features/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
} as Meta<typeof LoginForm>;

const Template = (args: typeof LoginForm.type) => <LoginForm {...args} />;

export const Primary: StoryObj<typeof LoginForm> = Template.bind({});
Primary.args = {}
Primary.decorators = [StoreDecorator({
  loginForm: { username: '123', password: '123' }
})]

export const withError: StoryObj<typeof LoginForm> = Template.bind({});
withError.args = {}
withError.decorators = [StoreDecorator({
  loginForm: { username: '123', password: '123', error: 'ERROR' }
})]

export const Loading: StoryObj<typeof LoginForm> = Template.bind({});
Loading.args = {}
Loading.decorators = [StoreDecorator({
  loginForm: { isLoading: true }
})]