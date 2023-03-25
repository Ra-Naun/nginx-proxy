// configs & utils:
import { useSites } from '@app/hooks/customHooks/content/useStoreData';
import classNames from 'classnames';

// hooks:
import { useState } from 'react';

// components:
import type { FC } from 'react';
import { Site as ISite } from '@app/store/siteStore/types';
import SitesList from '../SitesList/SitesList';

import styles from './AddSiteForm.module.scss';
import Site from '../Site/Site';

const AddSiteForm: FC<{ className?: string }> = ({ className }) => {
  const [isAdding, setIsAdding] = useState(false);

  const { addSiteWithServer } = useSites();

  const [site, setSite] = useState<Omit<ISite, 'id'>>({
    isActive: false,
    dns: {
      ip: '',
      port: 0,
      domain: '',
      isExternal: false,
    },
  });

  const toggle = async () => addSiteWithServer(site);

  const сlasses = classNames({
    [styles.addSiteForm]: true,
    [className || '']: !!className,
  });

  return (
    <section className={сlasses}>
      <button onClick={toggle} className={styles.addBtn}>
        Add new site
      </button>
    </section>
  );
};

export default AddSiteForm;
