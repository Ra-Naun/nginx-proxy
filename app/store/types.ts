import { ThunkDispatch, AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { Action } from 'redux';

import { makeStore } from './index';
import type { SiteStore } from './siteStore/types';
export interface StoreState {
  siteStore: SiteStore;
}

// export type Store = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<Store['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export type StoreControllerProps = {
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
  getState: () => StoreState;
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
