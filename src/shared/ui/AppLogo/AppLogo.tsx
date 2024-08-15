import React, { memo } from 'react';
import cl from './AppLogo.module.scss';
import { HStack } from '../Stack';
import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

interface AppLogoProps {
    className?: string;
}

export const AppLogo = memo(({ className }: AppLogoProps) => {
    return (
        <HStack
            max
            justify="center"
            className={classNames(cl.appLogoWrapper, {}, [className])}
        >
            <div className={cl.gradientBig} />
            <div className={cl.gradientSmall} />
            <AppSvg className={cl.appLogo} />
        </HStack>
    );
});
