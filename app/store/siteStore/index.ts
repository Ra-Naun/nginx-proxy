import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState, StoreControllerProps } from '@app/store/types';
import { Site, Sites, SiteStore, STATUS } from './types';
import initialState from './initialState';
import {
  getSites as getSitesRequest,
  addSite as addSiteRequest,
  updateSite as updateSiteRequest,
  removeSite as removeSiteRequest,
} from '@app/server/API-requests/nginx-config';
import logger from '@app/utils/logger';

export const getSitesFromServer = createAsyncThunk(
  'siteStore/getSitesFromServer',
  async (_, thunkAPI) => {
    const { getState, dispatch } = thunkAPI as StoreControllerProps;

    if (selectIsFetching(getState())) {
      return;
    }

    dispatch(setStatus(STATUS.FETCHING));

    try {
      let response = await getSitesRequest();
      const sitesFromRequest = response.data;
      dispatch(setSites(sitesFromRequest));
      dispatch(setStatus(STATUS.SUCCESS));
    } catch (error) {
      logger.error(error);
      dispatch(setStatus(STATUS.ERROR));
    }
  }
);

export const addSiteWithServer = createAsyncThunk(
  'siteStore/addSiteWithServer',
  async (site: Omit<Site, 'id'>, thunkAPI) => {
    const { getState, dispatch } = thunkAPI as StoreControllerProps;

    dispatch(addSite(site));

    if (selectIsFetching(getState())) {
      return;
    }

    dispatch(setStatus(STATUS.FETCHING));

    try {
      await addSiteRequest(site);

      dispatch(setStatus(STATUS.SUCCESS));
    } catch (error) {
      logger.error(error);
      dispatch(setStatus(STATUS.ERROR));
    }
  }
);

export const updateSiteWithServer = createAsyncThunk(
  'siteStore/updateSiteWithServer',
  async (site: Site, thunkAPI) => {
    const { getState, dispatch } = thunkAPI as StoreControllerProps;

    dispatch(updateSite(site));

    if (selectIsFetching(getState())) {
      return;
    }

    dispatch(setStatus(STATUS.FETCHING));

    try {
      await updateSiteRequest(site);

      dispatch(setStatus(STATUS.SUCCESS));
    } catch (error) {
      logger.error(error);
      dispatch(setStatus(STATUS.ERROR));
    }
  }
);

export const removeSiteWithServer = createAsyncThunk(
  'siteStore/removeSiteWithServer',
  async ({ id }: { id: Site['id'] }, thunkAPI) => {
    const { getState, dispatch } = thunkAPI as StoreControllerProps;

    dispatch(removeSite({ id }));

    if (selectIsFetching(getState())) {
      return;
    }

    dispatch(setStatus(STATUS.FETCHING));

    try {
      await removeSiteRequest({ id });

      dispatch(setStatus(STATUS.SUCCESS));
    } catch (error) {
      logger.error(error);
      dispatch(setStatus(STATUS.ERROR));
    }
  }
);

export const siteStore = createSlice({
  name: 'siteStore',
  initialState,
  reducers: {
    setSites: (state, action: PayloadAction<SiteStore['sites']>) => {
      state.sites = [...action.payload];
    },

    addSite: (state, action: PayloadAction<{ isActive: Site['isActive']; dns: Site['dns'] }>) => {
      state.sites = [...state.sites, { ...action.payload, id: '' + -state.sites.length }];
    },

    removeSite: (state, action: PayloadAction<{ id: Site['id'] }>) => {
      state.sites = state.sites.filter((s) => s.id !== action.payload.id);
    },

    updateSite: (state, action: PayloadAction<Site>) => {
      state.sites = state.sites.map((site) => {
        if (site.id === action.payload.id) {
          return { ...action.payload };
        }
        return site;
      });
    },

    setStatus: (state, action: PayloadAction<SiteStore['status']>) => {
      state.status = action.payload;
    },

    reset: (state) => {
      state.status = initialState.status;
      state.sites = initialState.sites;
    },
  },
});

export const { addSite, updateSite, removeSite, setStatus, reset } = siteStore.actions;
const { setSites } = siteStore.actions;

export const selectSites = (state: AppState): Site[] => state.siteStore.sites;

export const selectIsSuccess = (state: AppState): boolean => {
  return state.siteStore.status === STATUS.SUCCESS;
};

export const selectIsFetching = (state: AppState): boolean => {
  return state.siteStore.status === STATUS.FETCHING;
};

export const selectIsIdle = (state: AppState): boolean => {
  return state.siteStore.status === STATUS.IDLE;
};

export const selectIsError = (state: AppState): boolean => {
  return state.siteStore.status === STATUS.ERROR;
};

export default siteStore.reducer;
