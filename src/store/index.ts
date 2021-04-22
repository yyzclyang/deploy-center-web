import { createContext } from 'react';
import localStorageUtil from '@/utils/localStorageUtil';

export interface GlobalStore {
  token?: string;
  userInfo?: UserInfo;
}

type ActionType = 'CHANGE_TOKEN' | 'CHANGE_USER_INFO';

type Action = (
  state: GlobalStore,
  action: ReducerAction<ActionType>
) => GlobalStore;

export const Context = createContext(null);

export const initialState: GlobalStore = {
  token: localStorageUtil.get('__LOGIN_INFO__')?.token,
  userInfo: localStorageUtil.get('__LOGIN_INFO__')?.userInfo
};

const reducers: Record<ActionType, Action> = {
  CHANGE_TOKEN: (state: GlobalStore, action: ReducerAction<ActionType>) => {
    return { ...state, token: action.payload };
  },
  CHANGE_USER_INFO: (state: GlobalStore, action: ReducerAction) => {
    return { ...state, userInfo: action.payload };
  }
};

export const reducer = (
  state: GlobalStore,
  action: ReducerAction<ActionType>
) => {
  const fn = reducers[action.type];
  if (fn) {
    return fn(state, action);
  }
  throw new Error('unknown type');
};
