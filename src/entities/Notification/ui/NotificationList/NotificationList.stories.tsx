import type { Meta, StoryFn } from '@storybook/react';
import { NotificationList } from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
  title: 'entities/Notification/NotificationList',
  component: NotificationList,
  tags: ['autodocs'],
} as Meta<typeof NotificationList>;

const Template: StoryFn<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
Primary.decorators = [StoreDecorator({})]; // rtk => redux state
Primary.parameters = {
  mockData: [
    {
      url: __API__ + '/notifications',
      method: 'GET',
      status: 200,
      response: [
        {
          id: '1',
          title: 'sdfghjkl',
          description: 'waesfdghj'
        },
        {
          id: '2',
          title: 'gfhjkjhngfdbsa',
          description: 'waesfmjhgnfdbsfhfngbdxcdghj'
        },
        {
          id: '3',
          title: '34567uijmhngbfvdcswqwedrfgth',
          description: 'htjyukilo,iymudnbd'
        },
      ],
    },
  ]
}