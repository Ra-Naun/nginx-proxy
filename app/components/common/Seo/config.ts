import { domain } from '@app/config/site';
import { Props } from './Seo';

export const seoDefault: Props = {
  title: domain,
  description: '',
  keywords: '',
  noIndex: false,
};
