import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './Text.module.scss';
import { memo } from 'react';

// acccent - прям потсветить
export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'right' | 'left' | 'center';

export type TextSize = 's' | 'm' | 'l';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;

  'data-testid'?: string;
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToClass: Record<TextSize, string> = {
  s: 'size_s',
  m: 'size_m',
  l: 'size_l',
};

const mapSizeToHeadTag: Record<TextSize, HeaderTagType> = {
  s: 'h3',
  m: 'h2',
  l: 'h1',
};

export const Text = memo((props: TextProps) => {
  const {
    className,
    title,
    text,
    variant = 'primary',
    align = 'left',
    size = 'm',
    'data-testid': dataTestId = 'Text',
    bold,
  } = props;

  const HeaderTag = mapSizeToHeadTag[size];
  const sizeClass = mapSizeToClass[size];

  const additionalClasses = [className, cl[variant], cl[align], sizeClass];

  return (
    <div className={classNames('Text', {[cl.bold]: bold}, additionalClasses)}>
      {title && (
        <HeaderTag className={cl.title} data-testid={`${dataTestId}.Header`}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p className={cl.text} data-testid={`${dataTestId}.Paragraph`}>
          {text}
        </p>
      )}
    </div>
  );
});
