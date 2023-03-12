import nginxConfBuilder from './_NginxConfBuilder';
import sitesProvider from './SitesProvider';

export enum SYNC_STATUS {
  idle,
  syncing,
  synced,
  failed,
}

class Status {
  private status = SYNC_STATUS.idle;

  errorText = '';

  get isIdle() {
    return this.status === SYNC_STATUS.idle;
  }

  get isSyncing() {
    return this.status === SYNC_STATUS.syncing;
  }

  get isSynced() {
    return this.status === SYNC_STATUS.synced;
  }

  get isFailed() {
    return this.status === SYNC_STATUS.failed;
  }

  setIsIdle = () => {
    this.status = SYNC_STATUS.idle;
    this.errorText = '';
  };
  setIsSyncing = () => {
    this.status = SYNC_STATUS.syncing;
    this.errorText = '';
  };
  setIsSynced = () => {
    this.status = SYNC_STATUS.synced;
    this.errorText = '';
  };
  setIsFailed = (errorText: string) => {
    this.status = SYNC_STATUS.failed;
    this.errorText = errorText;
  };
}

class NginxConfProvider {
  status = new Status();

  sync = async () => {
    if (this.status.isSyncing) return;

    try {
      this.status.setIsSyncing();
      const activeSites = (await sitesProvider.getSites()).filter((site) => site.isActive);
      await nginxConfBuilder.sync(activeSites);
      this.status.setIsSynced();
    } catch (error: any) {
      this.status.setIsFailed(error.message);
    }
  };
}

const nginxConfProvider = new NginxConfProvider();

export default nginxConfProvider;
