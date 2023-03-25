// configs & utils:
import classNames from 'classnames';

// hooks:
import { useRouter } from 'next/router';
import { useInitSites } from '@app/hooks/customHooks/content/useStoreData';

// components:
import type { FC } from 'react';
import Spinner from '@app/components/common/Spinner/Spinner';
import SitesPanel from './SitesPanel/SitesPanel';

import styles from './Index.module.scss';

const Index: FC<{}> = () => {
  const router = useRouter();

  useInitSites();

  if (router.isFallback) {
    return <Spinner />;
  }

  const сlassesSitesPanel = classNames({
    container: true,
    [styles.sitesPanel]: true,
  });

  return (
    <div>
      <SitesPanel className={сlassesSitesPanel} />
    </div>
  );
};

export default Index;
