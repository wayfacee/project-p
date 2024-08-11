import type { Meta, StoryFn } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
} as Meta<typeof Skeleton>;

const Template: StoryFn<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Light = Template.bind({});
Light.args = {
  width: '100%',
  height: 200
};

export const CircleLight = Template.bind({});
CircleLight.args = {
  border: '50%',
  width: 100,
  height: 100
};

export const Dark = Template.bind({});
Dark.args = {
  width: '100%',
  height: 200
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const CircleDark = Template.bind({});
CircleDark.args = {
  border: '50%',
  width: 100,
  height: 100
};
CircleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Violet = Template.bind({});
Violet.args = {
  width: '100%',
  height: 200
};
Violet.decorators = [ThemeDecorator(Theme.VIOLET)];

export const CircleViolet = Template.bind({});
CircleViolet.args = {
  border: '50%',
  width: 100,
  height: 100
};
CircleViolet.decorators = [ThemeDecorator(Theme.VIOLET)];