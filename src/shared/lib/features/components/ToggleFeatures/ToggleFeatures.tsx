// для components - ToggleFeatures
// + в том что, робим как с комп., точно так же как мы с ними бы
// робили, если бы тоггл фичей даже и не было бы
import { ReactElement } from 'react';
import { FeatureFlags } from '../../../../types/featureFlags';
import { getFeatureFlag } from '../../lib/setGetFeatures';

interface ToggleFeaturesProps {
  feature: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

export const ToggleFeatures = (props: ToggleFeaturesProps) => {
  const { on, off, feature } = props;

  console.log('ToggleFeatures', feature);

  const isFeatureEnabled = getFeatureFlag(feature);
  return isFeatureEnabled ? on : off;
};
