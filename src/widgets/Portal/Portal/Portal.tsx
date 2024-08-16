import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode; // телепорт с помощью портала
  element?: HTMLElement; // контейнер в который хотим телепорт.
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated 
 */
export const Portal = (props: PortalProps) => {
  const {
    children,
    element = document.body, // если разраб не указал куда
  } = props;

  return createPortal(children, element);
};
