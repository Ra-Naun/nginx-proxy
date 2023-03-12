// config & utils:
import classNames from 'classnames';

// components:
import type { FC } from 'react';
import { Portal } from '@app/components/common/Portal/Portal';
import HamburgerIcon from '../icons/HamburgerIcon';
import NavigationLinks from '../NavigationLinks/NavigationLinks';

// hooks:
import { useState, useRef } from 'react';
import { useOnClickOutside } from '@app/hooks/customHooks/useOnClickOutside';

import styles from './NavBurger.module.scss';

interface Props {
  className?: string;
  isHidenCssClass: string;
}

const NavBurger: FC<Props> = ({ className, isHidenCssClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen(!isOpen);

  const onClose = () => setIsOpen(false);

  const refInner = useRef(null);
  const refBurgerBtn = useRef(null);
  useOnClickOutside([refInner, refBurgerBtn], onClose);

  return (
    <div
      className={classNames({
        [styles.burger]: true,
        [isHidenCssClass]: true,
        [className || '']: !!className,
      })}
    >
      <button
        className={classNames({
          [styles.burgerBtn]: true,
          [styles.burgerBtnOverlay]: isOpen,
        })}
        onClick={toggleIsOpen}
        ref={refBurgerBtn}
      >
        <HamburgerIcon className={styles.burgerIcon} />
      </button>

      {isOpen && (
        <Portal>
          <div
            className={classNames({ [styles.burgerInnerWrapper]: true, [isHidenCssClass]: true })}
          >
            <div
              className={classNames({ [styles.burgerOverlay]: true, [isHidenCssClass]: true })}
            />
            <div className={styles.burgerInner} aria-hidden={!isOpen}>
              <div
                className={classNames({
                  [styles.burgerLinksWrapper]: true,
                  container: true,
                })}
                ref={refInner}
              >
                <NavigationLinks className={styles.burgerLinks} onClick={onClose} />
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default NavBurger;
