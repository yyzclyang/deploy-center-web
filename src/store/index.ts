import React, { createContext } from 'react';
import localStorageUtil from '@/utils/localStorageUtil';

export interface GlobalStore {
  token?: string;
  userInfo?: UserInfo;
  loadingCount: number;
}

type GlobalActionType =
  | 'CHANGE_TOKEN'
  | 'CHANGE_USER_INFO'
  | 'CHANGE_LOADING_COUNT';

export type GlobalAction = (
  state: GlobalStore,
  action: ReducerAction<GlobalActionType>
) => GlobalStore;

export type GlobalReducer = (
  state: GlobalStore,
  action: ReducerAction<GlobalActionType>
) => GlobalStore;

export const GlobalContext = createContext<{
  state: GlobalStore;
  dispatch: React.Dispatch<ReducerAction<GlobalActionType, any>>;
}>(null);

export const initialState: GlobalStore = {
  token: localStorageUtil.get('__LOGIN_INFO__')?.token,
  userInfo: localStorageUtil.get('__LOGIN_INFO__')?.userInfo,
  loadingCount: 0
};

const reducers: Record<GlobalActionType, GlobalAction> = {
  CHANGE_TOKEN: (
    state: GlobalStore,
    action: ReducerAction<GlobalActionType, string>
  ) => {
    return { ...state, token: action.payload };
  },
  CHANGE_USER_INFO: (
    state: GlobalStore,
    action: ReducerAction<GlobalActionType, UserInfo>
  ) => {
    return { ...state, userInfo: action.payload };
  },
  CHANGE_LOADING_COUNT: (
    state: GlobalStore,
    action: ReducerAction<GlobalActionType, number>
  ) => {
    return { ...state, loadingCount: state.loadingCount + action.payload };
  }
};

export const reducer = (
  state: GlobalStore,
  action: ReducerAction<GlobalActionType>
) => {
  const fn = reducers[action.type];
  if (fn) {
    return fn(state, action);
  }
  throw new Error('unknown type');
};
