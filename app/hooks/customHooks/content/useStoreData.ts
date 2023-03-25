import { useAppSelector } from '@app/hooks/reduxHooks';
import {
  selectSites,
  addSite,
  updateSite,
  removeSite,
  addSiteWithServer,
  updateSiteWithServer,
  removeSiteWithServer,
  getSitesFromServer,
} from '@app/store/siteStore';
import type { Site } from '@app/store/siteStore/types';
import { AppDispatch } from '@app/store/types';
import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

export const useSites = () => {
  const sites = useAppSelector(selectSites);

  const dispatch = useDispatch<AppDispatch>();

  const data = useMemo(
    () => ({
      sites,

      addSite: (site: Omit<Site, 'id'>) => dispatch(addSite(site)),
      updateSite: (site: Site) => dispatch(updateSite(site)),
      removeSite: (params: { id: Site['id'] }) => dispatch(removeSite(params)),

      addSiteWithServer: (site: Omit<Site, 'id'>) => dispatch(addSiteWithServer(site)),
      updateSiteWithServer: (site: Site) => dispatch(updateSiteWithServer(site)),
      removeSiteWithServer: (params: { id: Site['id'] }) => dispatch(removeSiteWithServer(params)),
      getSitesFromServer: () => dispatch(getSitesFromServer()),
    }),
    [sites]
  );

  return data;
};

export const useInitSites = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getSitesFromServer());
  }, []);
};
