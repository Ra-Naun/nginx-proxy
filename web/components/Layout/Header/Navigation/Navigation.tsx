// configs & utils:
import classNames from 'classnames';

// hooks:

// components:
import type { FC } from 'react';
import NavigationLinks from './NavigationLinks/NavigationLinks';

import styles from './Navigation.module.scss';
import NavBurger from './NavBurger/NavBurger';

interface Props {
  className?: string;
}

const Navigation: FC<Props> = ({ className }) => {
  return (
    <nav
      className={classNames({
        [styles.navigation]: true,
        [className || '']: !!className,
      })}
    >
      {/* for desktop: */}
      <NavigationLinks className={styles.navigationList} />

      {/* for tablet and mobile: */}
      <NavBurger isHidenCssClass={styles.navigationBurgerIsHiden} />
    </nav>
  );
};

export default Navigation;
