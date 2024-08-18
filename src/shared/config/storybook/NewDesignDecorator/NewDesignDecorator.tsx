// стили, app or app_redesigned
// можно было и в земДекораторе сделать

import '@/app/styles/index.scss';
import { Decorator } from '@storybook/react';
import { setFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';

export const NewDesignDecorator: Decorator = (StoryComponent) => {
  setFeatureFlags({ ...getAllFeatureFlags(), isAppRedesigned: true });

  return (
    <div className={'app_redesigned'}>
      <StoryComponent />
    </div>
  );
};
