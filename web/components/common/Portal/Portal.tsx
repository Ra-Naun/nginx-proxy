import { useRef, useEffect, useState, ReactNode } from 'react';
import type { FC } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';

import styles from './Portal.module.scss';

interface PortalProps {
  children: ReactNode;
  containerName?: string;
}

export const Portal: FC<PortalProps> = ({ containerName, children }) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>(containerName || 'body');

    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (!mounted || !ref.current) return null;

  return createPortal(<>{children}</>, ref.current);
};
