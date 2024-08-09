import type { Meta, StoryFn } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarImg from '@/widgets/assets/tests/AvatarImg.jpg';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  }
} as Meta<typeof ProfileCard>;

const Template: StoryFn<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  data: {
    username: 'admin',
    age: 22,
    country: Country.Kyrgyzstan,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asd',
    currency: Currency.RUB,
    avatar: AvatarImg,
  },
};

export const withError = Template.bind({});
withError.args = {
  error: 'true'
}

export const isLoading = Template.bind({});
isLoading.args = {
  isLoading: true,
}
