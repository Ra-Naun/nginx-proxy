// configs & utils:
import { useSites } from '@app/hooks/customHooks/content/useStoreData';
import classNames from 'classnames';

// hooks:

// components:
import type { FC } from 'react';
import Site from '../Site/Site';

import styles from './SitesList.module.scss';

const SitesList: FC<{ className?: string }> = ({ className }) => {
  const сlasses = classNames({
    [styles.sitesList]: true,
    [className || '']: !!className,
  });

  const { sites } = useSites();

  return (
    <ol className={сlasses}>
      {sites
        .slice()
        .reverse()
        .map((site) => (
          <li className={styles.sitesListItem} key={site.id}>
            <Site site={site} />
          </li>
        ))}
    </ol>
  );
};

export default SitesList;
