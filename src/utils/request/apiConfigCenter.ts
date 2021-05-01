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

export const CreateRepository: ApiHostConfig = {
  serverType: ServerType.v1,
  apiPath: '/repositories'
};

export const UpdateRepository: ApiHostConfig = {
  serverType: ServerType.v1,
  apiPath: '/repositories/:id'
};

export const GetUnits: ApiHostConfig = {
  serverType: ServerType.v1,
  apiPath: '/units'
};

export const CreateUnit: ApiHostConfig = {
  serverType: ServerType.v1,
  apiPath: '/units'
};

export const UpdateUnits: ApiHostConfig = {
  serverType: ServerType.v1,
  apiPath: '/units/:id'
};

export const GetBranches: ApiHostConfig = {
  serverType: ServerType.v1,
  apiPath: '/branches/:id'
};
