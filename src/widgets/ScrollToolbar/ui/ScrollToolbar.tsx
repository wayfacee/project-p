import { classNames } from '@/shared/lib/classNames/classNames';
import * as cl from './ScrollToolbar.module.scss';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { SrollToTopButton } from '@/features/SrollToTopButton';

interface ScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props;
  const { t } = useTranslation();

  // не важно что виджет маленький, он имеет место быть
  return (
    <VStack
      align="center"
      justify="center"
      max
      className={classNames(cl.ScrollToolbar, {}, [className])}
    >
      <SrollToTopButton />
    </VStack>
  );
});
