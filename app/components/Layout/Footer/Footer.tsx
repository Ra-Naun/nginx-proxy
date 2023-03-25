// hooks:
import { useFooterData } from '@app/hooks/customHooks/content/useFooterData';

// components:
import Image from 'next/future/image';
import type { FC } from 'react';

import styles from './Footer.module.scss';

const Footer: FC<{}> = () => {
  const data = useFooterData();

  return (
    <footer className={styles.footer}>
      <Image
        className={styles.footerFon}
        src={data.banner.image}
        alt={data.banner.alt}
        width={1920}
        height={240}
      />
      <div className={styles.footerCopyright}>
        © Copyright {new Date().getFullYear()}. nginx-proxy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
