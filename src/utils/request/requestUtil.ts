import localStorageUtil from '@/utils/localStorageUtil';
import { RequestOptions } from '@/utils/request/fetchData';
import { ApiConfig } from './apiConfigCenter';
import { ServerHosts, ServerType } from './serverHosts';

export const isDev = () => process.env.NODE_ENV === 'development';
export const isProduct = () => process.env.NODE_ENV === 'production';

/**
 * 获取 API 的 host
 * @param serverType
 */
export function getServerUrl(serverType: ServerType): string {
  const env = isProduct() ? 'prod' : 'test';
  const { host, prefix } = ServerHosts[serverType][env];
  return isDev() ? prefix : host + prefix;
}

/**
 * 将 API 配置项转换为 URL
 * @param apiConfig API 配置项
 */
export function urlConfig2url(apiConfig: ApiConfig): string {
  const [apiHostConfig, apiParams = {}] = apiConfig;
  const { serverType, apiPath } = apiHostConfig;
  return Object.keys(apiParams).reduce((url, paramKey) => {
    return url.replace(new RegExp(`/:${paramKey}`), `/${apiParams[paramKey]}`);
  }, getServerUrl(serverType) + apiPath);
}

/**
 * 合并请求配置
 * @param options 自定义的配置
 * @param requestData 请求数据
 */
export function getRequestOptions(
  options: RequestOptions,
  requestData?: Record<string, any>
): RequestInit {
  const defaultRequestOptions: Partial<RequestInit> = {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${localStorageUtil.get('__LOGIN_INFO__')?.token}`
    }
  };
  const requestOptions = {
    ...defaultRequestOptions,
    ...options,
    headers: {
      ...defaultRequestOptions.headers,
      ...(options.headers ?? {})
    },
    body: JSON.stringify(requestData ?? '')
  };
  if (requestOptions.method === 'get') {
    delete requestOptions.body;
  }
  return requestOptions;
}
