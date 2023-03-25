import nginxConfProvider from '@app/services/nginx-conf/NginxConfProvider';
import sitesProvider from '@app/services/nginx-conf/SitesProvider';
import { Site } from '@app/store/siteStore/types';

export const handleGetSites = async () => {
  await sitesProvider.init();
  const sites = await sitesProvider.getSites();

  return sites;
};

export const handleAddSite = async (site: Omit<Site, 'id'>) => {
  await sitesProvider.init();

  if (!site.dns.domain || site.dns.port) return;

  await sitesProvider.addSite(site);
};

export const handleUpdateSite = async (site: Site) => {
  await sitesProvider.init();
  await sitesProvider.updateSite(site);
};

export const handleRemoveSite = async (id: Site['id']) => {
  await sitesProvider.init();
  await sitesProvider.removeSite(id);
};

export const handleRebuildNginxConf = async () => nginxConfProvider.sync();
