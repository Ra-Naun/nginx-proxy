// components:
import type { FC } from 'react';
import Seo from '@app/components/common/Seo/Seo';

import styles from './Custom404.module.scss';

const Custom404: FC = () => {
  return (
    <>
      <Seo />
      <div className={styles.notFound}>
        <h1>NotFound</h1>
      </div>
    </>
  );
};

export default Custom404;
