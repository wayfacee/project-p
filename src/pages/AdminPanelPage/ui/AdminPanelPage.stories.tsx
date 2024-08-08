import type { Meta, StoryFn } from '@storybook/react';
import AdminPanelPage from './AdminPanelPage';

export default {
  title: 'shared/AdminPanelPage',
  component: AdminPanelPage,
  tags: ['autodocs'],
} as Meta<typeof AdminPanelPage>;

const Template: StoryFn<typeof AdminPanelPage> = () => <AdminPanelPage />;

export const Primary = Template.bind({});
Primary.args = {
};