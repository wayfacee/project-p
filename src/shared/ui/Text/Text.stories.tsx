import type { Meta, StoryObj } from '@storybook/react';
import 'app/styles/index.scss'
import { Text, TextTheme } from './Text';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
  title: 'shared/Text',
  component: Text,
  tags: ['autodocs'],
} as Meta<typeof Text>;

const Template = (args: typeof Text) => <Text {...args} />;

export const Primary: StoryObj<typeof Text> = Template.bind({});
Primary.args = {
  title: 'Title',
  text: 'Text'
}

export const Error: StoryObj<typeof Text> = Template.bind({});
Error.args = {
  title: 'Title',
  text: 'Text',
  theme: TextTheme.ERROR,
}

export const onlyTitle: StoryObj<typeof Text> = Template.bind({});
onlyTitle.args = {
  title: 'Title',
}

export const onlyText: StoryObj<typeof Text> = Template.bind({});
onlyText.args = {
  text: 'Text'
}

// ----------
export const PrimaryDark: StoryObj<typeof Text> = Template.bind({});
PrimaryDark.args = {
  title: 'Title',
  text: 'Text'
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitleDark: StoryObj<typeof Text> = Template.bind({});
onlyTitleDark.args = {
  title: 'Title',
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark: StoryObj<typeof Text> = Template.bind({});
onlyTextDark.args = {
  text: 'Text'
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];