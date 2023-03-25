// configs & utils:
import classNames from 'classnames';

// components:
import type { FC } from 'react';
import Logo from './Logo/Logo';
import Navigation from './Navigation/Navigation';

import styles from './Header.module.scss';

const Header: FC<{}> = () => {
  return (
    <header className={classNames({ [styles.headerWrapper]: true })}>
      <div className={classNames({ container: true, [styles.header]: true })}>
        <Logo className={styles.headerLogo} />
        <Navigation className={styles.headerNavigation} />
      </div>
    </header>
  );
};

export default Header;
