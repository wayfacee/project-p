import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
  title: 'widgets/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: {control: 'color'},
  },
} as Meta<typeof Modal>;

const Template = (args: typeof Modal) => <Modal {...args} />;

export const Primary: StoryObj<typeof Modal> = Template.bind({});
Primary.args = {
  isOpen: true,
  children: 'lorem',
}

export const Dark: StoryObj<typeof Modal> = Template.bind({});
Dark.args = {
  isOpen: true,
  children: 'lorem',
}
Dark.decorators = [ThemeDecorator(Theme.DARK)]