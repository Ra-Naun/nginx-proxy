import { SiteStore, STATUS } from './types';

const initialState: SiteStore = {
  sites: [],
  status: STATUS.IDLE,
};

export default initialState;
