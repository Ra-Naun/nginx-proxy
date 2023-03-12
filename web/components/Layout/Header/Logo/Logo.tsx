// configs & utils:
import classNames from 'classnames';
// hooks:

// components:
import type { FC } from 'react';
import Image from 'next/future/image';
import Link from 'next/link';
import NginxIcon from './images/NginxIcon';

import styles from './Logo.module.scss';

interface Props {
  className?: string;
}

const Logo: FC<Props> = ({ className }) => {
  return (
    <Link href="/">
      <a
        className={classNames({
          [styles.logo]: true,
          [className || '']: !!className,
        })}
      >
        <NginxIcon className={styles.logoIcon} />
      </a>
    </Link>
  );
};

export default Logo;
