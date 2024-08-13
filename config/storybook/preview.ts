import type { Preview } from '@storybook/react';
import { RouterDecorator } from '@/shared/config/storybook/RouterDecorator/RouterDecorator';
import { StyleDecorator } from '@/shared/config/storybook/StyleDecorator/StyleDecorator';
import { SuspenseDecorator } from '@/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // без педддингов:
    layout: 'fullscreen',
    themes: {
      default: 'light',
      list: [
        // color - цветовой кружочек, рядом с пункт. меню
        { name: 'light', class: Theme.LIGHT, color: '#090949' },
        { name: 'dark', class: Theme.DARK, color: '#e8e8ea' },
        { name: 'violet', class: Theme.VIOLET, color: '#844d71' },
      ],
    },
  },
  decorators: [
    // обретка, типо импорт стайлов, чтоб кд раз не импортить, порядок не важен
    StyleDecorator,
    ThemeDecorator(Theme.LIGHT),
    RouterDecorator,
    SuspenseDecorator,
  ],
};

export default preview;
