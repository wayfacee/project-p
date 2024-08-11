import type { Meta, StoryFn } from '@storybook/react';
import { RatingCard } from './RatingCard';

export default {
  title: 'entities/RatingCard',
  component: RatingCard,
  tags: ['autodocs'],
} as Meta<typeof RatingCard>;

const Template: StoryFn<typeof RatingCard> = (args) => <RatingCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};