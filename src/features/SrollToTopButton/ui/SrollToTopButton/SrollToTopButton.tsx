import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import * as cl from './SrollToTopButton.module.scss';
import { memo } from 'react';
import { Icon } from '@/shared/ui/redesigned/Icon';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';

interface SrollToTopButtonProps {
  className?: string;
}

export const SrollToTopButton = memo((props: SrollToTopButtonProps) => {
  const { className } = props;
  const { t } = useTranslation();

  // можно не исп. юзкаллбэк, мемо обертнут, пропсов не приним.
  // не будет перерис.
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // position будем делать в виджете
  return (
    <Icon
      Svg={CircleIcon}
      onClick={onClick}
      clickable
      width={32}
      height={32}
      className={classNames(cl.SrollToTopButton, {}, [className])}
    />
  );
});
