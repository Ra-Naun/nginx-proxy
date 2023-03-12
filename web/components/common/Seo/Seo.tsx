// configs & utils:
import { domain } from '@app/config/site';
import { seoDefault } from './config';

// hooks:
import { useRouter } from 'next/router';

// components:
import type { FC } from 'react';
import Head from 'next/head';

export interface Props {
  title?: string;
  description?: string;
  keywords?: string;
  noIndex?: boolean;
}

const Seo: FC<Props> = (seoFromProps) => {
  const { asPath } = useRouter();

  const { title, description, keywords, noIndex } = {
    ...seoDefault,
    ...seoFromProps,
  };

  const canonicalTag = (
    <link key="canonical" rel="canonical" href={`${domain}/${asPath.split('?')[0]}`} />
  );

  return (
    <Head>
      <title>{title}</title>

      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}

      {canonicalTag}
    </Head>
  );
};

export default Seo;
