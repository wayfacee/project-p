import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import * as cl from './Modal.module.scss';
import { ReactNode } from 'react';
import { Portal } from '../../Portal/Portal/Portal';
import { Overlay } from '@/shared/ui/redesigned/Overlay/Overlay';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';
import { toggleFeatures } from '@/shared/lib/features';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
  const { className, children, isOpen, onClose, lazy } = props;

  const { isClosing, isMounted, close } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  });

  const mods: Mods = {
    [cl.opened]: isOpen,
    [cl.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    // саму модалку не отрис.
    return null;
    // с флагом лейзи модалку в дом дерево не монтируем
  }

  // нельзя к модал прикреплять дарк, лайт, и дизайнить
  // тк. придется в файлах рыться итд. редизайнить

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div
        className={classNames(cl.Modal, mods, [
          className,
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cl.modalNew,
            off: () => cl.modalOld,
          }),
        ])}
      >
        <Overlay onClick={close} />
        <div className={cl.content}>{children}</div>
      </div>
    </Portal>
  );
};
