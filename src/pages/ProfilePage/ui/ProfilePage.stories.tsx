import type { Meta, StoryFn } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import ProfilePage from './ProfilePage';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Country } from 'enteties/Country';
import { Currency } from 'enteties/Currency';
import AvatarImg from 'widgets/assets/tests/AvatarImg.jpg';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  }
} as Meta<typeof ProfilePage>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const Template: StoryFn<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({
  profile: {
    form: {
      username: 'admin',
      age: 22,
      country: Country.Kyrgyzstan,
      lastname: 'ulbi tv',
      first: 'asd',
      city: 'asd',
      currency: Currency.RUB,
      avatar: AvatarImg,
    }
  }
})]

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
  profile: {
    form: {
      username: 'admin',
      age: 22,
      country: Country.Kyrgyzstan,
      lastname: 'ulbi tv',
      first: 'asd',
      city: 'asd',
      currency: Currency.RUB,
      avatar: AvatarImg,
    }
  }
})];