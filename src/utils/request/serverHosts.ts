// 请求环境类型
export type ServerHostEnv = 'prod' | 'test';

// Host 配置
export interface HostConfig {
  host: string;
  prefix: string;
}

// 后台服务所有环境的域名
export type ServerHost = {
  [key in ServerHostEnv]: HostConfig;
};

// 后台服务名
export enum ServerType {
  v1 = 'v1'
}

export const ServerHosts: Record<ServerType, ServerHost> = {
  v1: {
    test: {
      host: '//deploy.yyzcl.cn',
      prefix: '/api/v1'
    },
    prod: {
      host: '//deploy.yyzcl.cn',
      prefix: '/api/v1'
    }
  }
};
