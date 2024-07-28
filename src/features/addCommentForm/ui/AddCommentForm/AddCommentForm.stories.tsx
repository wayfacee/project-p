import type { Meta, StoryFn } from '@storybook/react';
import AddCommentForm from './AddCommentForm';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { action } from '@storybook/addon-actions';

export default {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
  tags: ['autodocs'],
} as Meta<typeof AddCommentForm>;

const Template: StoryFn<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onSendComment: action('onSendComment');
};
Primary.decorators = [
  StoreDecorator({})
]