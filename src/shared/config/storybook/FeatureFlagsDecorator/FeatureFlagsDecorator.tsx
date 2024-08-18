// как иниц. фича флаги в комп., пошта старый + новый
// до / после выглДят по разному, новые сост. тоже надо тест
import '@/app/styles/index.scss';
import { setFeatureFlags } from '@/shared/lib/features';
import { FeatureFlags } from '../../../types/featureFlags';
import { Decorator } from '@storybook/react';

// замыкание, чтоб проиниц. фичи
export const FeatureFlagsDecorator =
  (features: FeatureFlags): Decorator =>
  (StoryComponent) => {
    setFeatureFlags(features);

    return <StoryComponent />;
  };

/**
 * если открыть новый => старый, то дизайн будет новым
 * пошта мы переопред. фича флаги, и глоб. обновилась,
 * поэтому нам надо сбрасывать знач.
 * preview.ts:
    FeatureFlagsDecorator({}),
 */