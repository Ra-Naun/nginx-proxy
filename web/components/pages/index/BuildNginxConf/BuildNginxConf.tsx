// configs & utils:
import classNames from 'classnames';
import { rebuildNginxConf } from '@app/server/API-requests/nginx-config';

// hooks:
import { useState } from 'react';

// components:
import type { FC } from 'react';

import styles from './BuildNginxConf.module.scss';
import logger from '@app/utils/logger';

const BuildNginxConf: FC<{ className?: string }> = ({ className }) => {
  const [isBuilding, setIsBuilding] = useState(false);

  const handlerRebuildNginxConf = async () => {
    try {
      setIsBuilding(true);
      rebuildNginxConf();
    } catch (error) {
      logger.error(error);
    } finally {
      setIsBuilding(false);
    }
  };

  const сlasses = classNames({
    [styles.build]: true,
    [className || '']: !!className,
  });

  return (
    <section className={сlasses}>
      <button onClick={handlerRebuildNginxConf} className={styles.buildBtn} disabled={isBuilding}>
        Build Nginx Conf
      </button>
    </section>
  );
};

export default BuildNginxConf;
