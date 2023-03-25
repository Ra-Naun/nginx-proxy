// components:
import type { FC } from 'react';

import styles from './Main.module.scss';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Main: FC<Props> = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
