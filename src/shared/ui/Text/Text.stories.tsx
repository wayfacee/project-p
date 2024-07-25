import { Meta, StoryFn } from '@storybook/react/*';
import 'app/styles/index.scss'
import { Text, TextTheme } from './Text';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
  title: 'shared/Text',
  component: Text,
  tags: ['autodocs'],
} as Meta<typeof Text>;

const Template: StoryFn<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title',
  text: 'Text'
}

export const Error = Template.bind({});
Error.args = {
  title: 'Title',
  text: 'Text',
  theme: TextTheme.ERROR,
}

export const onlyTitle = Template.bind({});
onlyTitle.args = {
  title: 'Title',
}

export const onlyText = Template.bind({});
onlyText.args = {
  text: 'Text'
}

// ----------
export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: 'Title',
  text: 'Text'
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTitleDark = Template.bind({});
onlyTitleDark.args = {
  title: 'Title',
};
onlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const onlyTextDark = Template.bind({});
onlyTextDark.args = {
  text: 'Text'
};
onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];