import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Icon.module.scss';
import React, { memo } from "react";

interface IconProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
  inverted?: boolean;
}

export const Icon = memo((props: IconProps) => {
  const {
    className,
    Svg,
    inverted
  } = props;

  return (
    <Svg
      className={classNames(inverted ? cl.inverted : cl.Icon, {}, [className])}
    />
  );
});