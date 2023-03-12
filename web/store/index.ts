import { configureStore, combineReducers, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

import type { AppStore, StoreState } from './types';
import siteReducer from './siteStore';
import { isProd } from '@app/config/server';

const combinedReducer = combineReducers<StoreState>({
  siteStore: siteReducer,
});

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
    devTools: !isProd,
  });

// export const wrapper = createWrapper(makeStore, { debug: !isProd });
export const wrapper = createWrapper<AppStore>(makeStore);
