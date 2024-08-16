import type { Meta, StoryFn } from '@storybook/react';
import { Tabs } from './Tabs';

// обычный экшен который мокает функц., и позволяет
// отслеживать в логах, какая функц. была вызвана
import { action } from '@storybook/addon-actions';

export default {
  title: 'shared/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} as Meta<typeof Tabs>;

const Template: StoryFn<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  tabs: [
    {
      value: '1',
      content: 't 1',
    },
    {
      value: '2',
      content: 't 2',
    },
    {
      value: '3',
      content: 't 3',
    },
  ],
  value: '2',
  onTabClick: action('onTabClick'),
};
