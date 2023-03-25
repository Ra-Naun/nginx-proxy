// configs & utils:
import classNames from 'classnames';

// components:
import type { FC } from 'react';
import Link from 'next/link';

// hooks:
import useTabIdx from './useTabIdx';
import { useNavigationData } from '@app/hooks/customHooks/content/useNavigationData';

import styles from './NavigationLinks.module.scss';

interface Props {
  className?: string;
  onClick?: (event?: any) => any;
}

const NavigationLinks: FC<Props> = ({ className, onClick }) => {
  const activeTabIdx = useTabIdx();

  const data = useNavigationData();

  return (
    <>
      {data.navigation.map((navEl, idx) => (
        <Link href={navEl.link} key={idx}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a
            className={classNames({
              [styles.link]: true,
              [styles.linkActive]: activeTabIdx === idx,
              [className || '']: !!className,
            })}
            onClick={onClick}
          >
            {navEl.text}
          </a>
        </Link>
      ))}
    </>
  );
};

export default NavigationLinks;
