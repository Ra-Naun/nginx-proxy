// hooks:
import { useRouter } from 'next/router';
import { useInitSites, useSites } from '@app/hooks/customHooks/content/useStoreData';

// components:
import type { FC } from 'react';
import Spinner from '@app/components/common/Spinner/Spinner';

import styles from './Links.module.scss';

const Links: FC<{}> = () => {
  const router = useRouter();
  useInitSites();
  const { sites } = useSites();

  if (router.isFallback) {
    return <Spinner />;
  }

  return (
    <ol className={styles.links}>
      {sites
        .filter((site) => site.isActive)
        .slice()
        .reverse()
        .map((site) => (
          <li className={styles.linksItem} key={site.id}>
            <a href={`https://${site.dns.domain}`} target="_blank" rel="noreferrer">
              {site.dns.domain}
            </a>
          </li>
        ))}
    </ol>
  );
};

export default Links;
