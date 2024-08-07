import type { Meta, StoryFn } from '@storybook/react';
import { EditableProfileCardHeader } from './EditableProfileCardHeader';

export default {
  title: 'features/editableProfileCard/EditableProfileCardHeader',
  component: EditableProfileCardHeader,
  tags: ['autodocs'],
} as Meta<typeof EditableProfileCardHeader>;

const Template: StoryFn<typeof EditableProfileCardHeader> = (args) => <EditableProfileCardHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};