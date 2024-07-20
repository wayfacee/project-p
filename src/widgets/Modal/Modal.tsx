import { classNames } from "shared/lib/classNames/classNames";
import * as cl from './Modal.module.scss';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "widgets/Portal/Portal";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
  } = props;

  const [isClosing, setIsClosing] = useState(false);
  const timeRef = useRef<ReturnType<typeof setTimeout>>();

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timeRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose])

  // new links!!! создаются заново на кд перерендер
  // useCallback - мемориз. знач. функции, запоминает, 
  // возвращает одну и ту же ссылку,
  // если в массиве завис. ниче не измен. | react-hooks
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      closeHandler();
    }
  }, [closeHandler]);

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    clearTimeout(timeRef.current);
    window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onKeyDown]);

  const mods: Record<string, boolean> = {
    [cl.opened]: isOpen,
    [cl.isClosing]: isClosing,
  }

  // нельзя к модал прикреплять дарк, лайт, т дизайнить
  // тк. придется в файлах рыться итд. редизайнить

  return (
    <Portal>
      <div className={classNames(cl.Modal, mods, [className])}>
        <div className={cl.overlay} onClick={closeHandler}>
          <div className={cl.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};