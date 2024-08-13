// когда нужн. будет тест. какие-то комп. у которых есть
// lazy loading но при этом саспенс где то выше
// и мы не хотим кд по сторибук искать где этого саспенса
// нет

import { Decorator } from '@storybook/react';
import { Suspense } from 'react';

export const SuspenseDecorator: Decorator = (StoryComponent) => (
  <Suspense>
    <StoryComponent />
  </Suspense>
);
