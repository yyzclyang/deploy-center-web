import { ServerType } from '@/utils/request/serverHosts';

export interface ApiHostConfig {
  serverType: ServerType;
  apiPath: string;
}

export interface ApiParams {
  [index: string]: string;
}

export interface QueryParams {
  [index: string]: string | number;
}

export type ApiConfig = [ApiHostConfig, ApiParams?, QueryParams?];

export const LoginApi: ApiHostConfig = {
  serverType: ServerType.v1,
  apiPath: '/login'
};

export const GetRepositories: ApiHostConfig = {
  serverType: ServerType.v1,
  apiPath: '/repositories'
};

export const GetRepository: ApiHostConfig = {
  serverType: ServerType.v1,
  apiPath: '/repositories/:id'
};
