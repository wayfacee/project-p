import type { Meta, StoryFn } from '@storybook/react';
import { Modal } from './Modal';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'widgets/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: {control: 'color'},
  },
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children: 'lorem',
};

export const Dark = Template.bind({});
Dark.args = {
  isOpen: true,
  children: 'lorem',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
