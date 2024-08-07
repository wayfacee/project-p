import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Text.module.scss';
import { memo } from "react";

export enum TextTheme {
  PRIMARY = 'primary',
  INVETED = 'inverted',
  ERROR = 'error',
}

export enum TextAlign {
  RIGHT = 'right',
  LEFT = 'left',
  CENTER = 'center'
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;

  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeadTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
}

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
    "data-testid": dataTestId = 'Text',
  } = props;

  const HeaderTag = mapSizeToHeadTag[size];

  return (
    <div className={classNames('Text', {}, [className, cl[theme], cl[align], cl[size]])}>
      {title && (
        <HeaderTag
          className={cl.title}
          data-testid={`${dataTestId}.Header`}
        >{title}
        </HeaderTag>
      )}
      {text && (
        <p
          className={cl.text}
          data-testid={`${dataTestId}.Paragraph`}
        >
          {text}
        </p>
      )}
    </div>
  );
});