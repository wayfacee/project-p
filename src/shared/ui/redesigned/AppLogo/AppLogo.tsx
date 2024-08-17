import React, { memo } from 'react';
import cl from './AppLogo.module.scss';
import { HStack } from '../Stack';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo(({ className, size = 50 }: AppLogoProps) => {
  return (
    <HStack
      max
      justify="center"
      className={classNames(cl.appLogoWrapper, {}, [className])}
    >
      <AppSvg width={size} height={size} color="black" className={cl.appLogo} />
      <div className={cl.gradientBig} />
      <div className={cl.gradientSmall} />
    </HStack>
  );
});