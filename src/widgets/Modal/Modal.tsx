import { classNames, Mods } from "shared/lib/classNames/classNames";
import * as cl from './Modal.module.scss';
import React, { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "../Portal/Portal";
import { Overlay } from "shared/ui/Overlay/Overlay";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    lazy,
  } = props;

  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  // const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null); хитрим:
  const timeRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen])

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);

      // реф - не/мутабельный, тип надо явно указать 
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

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    clearTimeout(timeRef.current);
    window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onKeyDown]);

  const mods: Mods = {
    [cl.opened]: isOpen,
    [cl.isClosing]: isClosing,
  }

  if (lazy && !isMounted) {
    // саму модалку не отрис.
    return null;
    // с флагом лейзи модалку в дом дерево не монтируем
  }

  // нельзя к модал прикреплять дарк, лайт, и дизайнить
  // тк. придется в файлах рыться итд. редизайнить

  return (
    <Portal>
      <div className={classNames(cl.Modal, mods, [className])}>
        <Overlay onClick={closeHandler} />
        <div className={cl.content}>
          {children}
        </div>
      </div>
    </Portal>
  );
};