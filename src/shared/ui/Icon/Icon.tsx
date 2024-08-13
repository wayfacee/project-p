import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './Icon.module.scss';
import React, { memo, SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
  const { className, Svg, inverted, ...otherProps } = props;

  return (
    <Svg
      className={classNames(inverted ? cl.inverted : cl.Icon, {}, [className])}
      {...otherProps}
    />
  );
});
