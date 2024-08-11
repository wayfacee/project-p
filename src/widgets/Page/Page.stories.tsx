import type { Meta, StoryFn } from '@storybook/react';
import { Page } from './Page';

export default {
  title: 'widgets/Page',
  component: Page,
  tags: ['autodocs'],
} as Meta<typeof Page>;

const Template: StoryFn<typeof Page> = (args) => <Page {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};