import type { Meta, StoryFn } from '@storybook/react';
import { Dropdown } from './Dropdown';
import { Button } from '../../../Button/Button';

export default {
  title: 'shared/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  trigger: <Button>Open!</Button>,
  items: [
    {
      content: 'first'
    },
    {
      content: '2'
    },
    {
      content: 'sdfgerrge'
    }
  ]
};