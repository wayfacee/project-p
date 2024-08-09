import { MutableRefObject, useCallback, useEffect, useRef, useState } from "react";

interface UseModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  animationDelay: number;
}

export function useModal(props: UseModalProps) {
  const {
    isOpen,
    onClose,
    animationDelay
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

  const close = useCallback(() => {
    if (onClose) {
      setIsClosing(true);

      // реф - не/мутабельный, тип надо явно указать 
      timeRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, animationDelay);
    }
  }, [animationDelay, onClose])

  // new links!!! создаются заново на кд перерендер
  // useCallback - мемориз. знач. функции, запоминает, 
  // возвращает одну и ту же ссылку,
  // если в массиве завис. ниче не измен. | react-hooks
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      close();
    }
  }, [close]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    clearTimeout(timeRef.current);
    window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onKeyDown]);

  return {
    isClosing,
    isMounted,
    close,
  }
} 