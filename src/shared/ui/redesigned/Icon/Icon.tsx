import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './Icon.module.scss';
import React, { memo, SVGProps } from 'react';

// раньше оборачивали в аппЛинк, а сейчас прям зашиваем
type SvgProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

// можем стили, ховеры добалять итд.
interface NonClickableIconProps extends IconBaseProps {
  clickable?: false; // | undefined
}

interface ClickableIconProps extends IconBaseProps {
  clickable: true;
  onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = memo((props: IconProps) => {
  const {
    className,
    Svg,
    width = 32,
    height = 32,
    clickable,
    ...otherProps
  } = props;

  const icon = (
    <Svg
      className={classNames(cl.Icon, {}, [className])}
      width={width}
      height={height}
      {...otherProps}
      onClick={undefined} // ошибка при клике в сайдбаре
    />
  );

  if (clickable) {
    return (
      // если деструк, то онКлика там не будет
      // пошта NonClickableIconProps там нет
      // а в условии тс понимает что будет
      <button
        type="button"
        className={cl.button}
        onClick={props.onClick}
        style={{ width, height }} // будет соотв. размеру иконки
      >
        {icon}
      </button>
    );
  }

  return icon;
});
