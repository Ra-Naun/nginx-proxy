export type Site = {
  id: string;
  dns: {
    domain: string;
    isExternal: boolean;
    ip?: string;
    port: number;
  };
  isActive: boolean;
};

export type Sites = Site[];

export type SiteStore = {
  sites: Sites;
  status: STATUS;
};

export enum STATUS {
  IDLE = 'idle',
  FETCHING = 'fetching',
  ERROR = 'error',
  SUCCESS = 'success',
}
