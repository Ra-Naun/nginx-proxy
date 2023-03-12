import { Site } from '@app/store/siteStore/types';

const sitesInitialState: Site[] = [
  {
    id: '1',
    dns: {
      domain: 'nginx-proxy.comdev',
      port: 3099,
      isExternal: false,
    },
    isActive: true,
  },
  {
    id: '2',
    dns: {
      domain: 'nginx-proxy.comtest',
      port: 3099,
      isExternal: false,
    },
    isActive: false,
  },
  {
    id: '3',
    dns: {
      domain: 'nebons007.comdev',
      port: 3011,
      isExternal: false,
    },
    isActive: true,
  },
  {
    id: '4',
    dns: {
      domain: 'nebons007.comtest',
      port: 3011,
      isExternal: false,
    },
    isActive: false,
  },
];

class SitesProvider {
  isInited: boolean = false;

  init = async () => {
    if (this.isInited) return;
    // request from DB
    this.sites = sitesInitialState;
    this.isInited = true;
  };

  private sites: Site[] = [];

  getSites = async () => {
    await this.sync();
    return this.sites;
  };

  setSites = async (sites: Site[]) => {
    this.sites = sites;
    await this.sync();
  };

  addSite = async (site: Omit<Site, 'id'>) => {
    this.sites.push({ ...site, id: '' + -this.sites.length });
    await this.sync();
  };

  updateSite = async (site: Site) => {
    const isExist = this.sites.find((s) => s.id === site.id);

    if (isExist) {
      this.sites = this.sites.map((s) => (s.id === site.id ? site : s));
    } else this.addSite(site);

    await this.sync();
  };

  removeSite = async (id: Site['id']) => {
    this.sites = this.sites.filter((s) => s.id !== id);
    await this.sync();
  };

  sync = async () => {
    // sync sites with DB
    // провести UPDATE в бд для id сайтов из this.sites, а после запросить новый список сайтов
    // и подумать о кэше
  };
}

const sitesProvider = new SitesProvider();

export default sitesProvider;
