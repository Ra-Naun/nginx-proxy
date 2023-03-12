// configs & utils:
import { useSites } from '@app/hooks/customHooks/content/useStoreData';
import classNames from 'classnames';

// hooks:
import { useState } from 'react';

// components:
import type { FC } from 'react';
import AddSiteForm from '../AddSiteForm/AddSiteForm';
import SitesList from '../SitesList/SitesList';
import BuildNginxConf from '../BuildNginxConf/BuildNginxConf';

import styles from './SitesPanel.module.scss';

const SitesPanel: FC<{ className?: string }> = ({ className }) => {
  const сlasses = classNames({
    [styles.sitesPanel]: true,
    [className || '']: !!className,
  });

  return (
    <section className={сlasses}>
      <BuildNginxConf className={styles.buildNginxConf} />

      <AddSiteForm className={styles.addSiteForm} />

      <SitesList />
    </section>
  );
};

export default SitesPanel;
