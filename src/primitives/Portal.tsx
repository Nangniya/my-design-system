import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
  container?: HTMLElement;
};

const Portal = ({ children, container = document.body }: PortalProps) => {
  return createPortal(children, container);
};

export default Portal;
