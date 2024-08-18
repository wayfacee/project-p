import type { Meta, StoryFn } from '@storybook/react';
import { ProfileCard } from './ProfileCard';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import AvatarImg from '@/shared/assets/tests/AvatarImg.jpg';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as Meta<typeof ProfileCard>;

const Template: StoryFn<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

const primaryArgs = {
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

export const Primary = Template.bind({});
Primary.args = primaryArgs;

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = primaryArgs;
PrimaryRedesigned.decorators = [NewDesignDecorator, ThemeDecorator(Theme.DARK)];

export const withError = Template.bind({});
withError.args = {
  error: 'true',
};

export const isLoading = Template.bind({});
isLoading.args = {
  isLoading: true,
};
