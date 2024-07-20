import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonSize, ButtonTheme } from './Button';
import 'app/styles/index.scss'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';

export default {
  title: 'shared/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    // backgroundColor: {control: 'color'},
  },
} as Meta<typeof Button>;

const Template = (args: StoryObj<typeof Button>) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'text',
}

export const Clear: StoryObj<typeof Button> = Template.bind({});
Clear.args = {
  children: 'text',
  theme: ButtonTheme.CLEAR,
}

export const Outline: StoryObj<typeof Button> = Template.bind({});
Outline.args = {
  children: "text",
  theme: ButtonTheme.OUTLINE
}

export const OutlineSizeL: StoryObj<typeof Button> = Template.bind({});
OutlineSizeL.args = {
  children: "text",
  theme: ButtonTheme.OUTLINE,
  size: ButtonSize.L
}

export const OutlineSizeXL: StoryObj<typeof Button> = Template.bind({});
OutlineSizeXL.args = {
  children: "text",
  theme: ButtonTheme.OUTLINE,
  size: ButtonSize.XL
}

export const OutlineDark: StoryObj<typeof Button> = Template.bind({});
OutlineDark.args = {
  children: "text",
  theme: ButtonTheme.OUTLINE
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

// ----------
export const BackgroundTheme: StoryObj<typeof Button> = Template.bind({});
BackgroundTheme.args = {
  children: "text",
  theme: ButtonTheme.BACKGROUND
};

export const BackgroundInverted: StoryObj<typeof Button> = Template.bind({});
BackgroundInverted.args = {
  children: "text",
  theme: ButtonTheme.BACKGROUND_INVERTED
};

// -------
export const Square: StoryObj<typeof Button> = Template.bind({});
Square.args = {
  children: ">",
  theme: ButtonTheme.BACKGROUND_INVERTED,
  square: true,
};

export const SquareSizeL: StoryObj<typeof Button> = Template.bind({});
SquareSizeL.args = {
  children: ">",
  theme: ButtonTheme.BACKGROUND_INVERTED,
  square: true,
  size: ButtonSize.L,
};

export const SquareSizeXL: StoryObj<typeof Button> = Template.bind({});
SquareSizeXL.args = {
  children: ">",
  theme: ButtonTheme.BACKGROUND_INVERTED,
  square: true,
  size: ButtonSize.XL,
};