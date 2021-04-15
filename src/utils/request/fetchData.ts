import { ApiConfig } from '@/utils/request/apiConfigCenter';
import { getRequestOptions, urlConfig2url } from '@/utils/request/requestUtil';
import history from '../history';

export type RequestOptions = Omit<RequestInit, 'body'>;

const fetchData = <T = Record<string, any>>(
  apiConfig: ApiConfig,
  data?: Record<string, any>,
  options?: RequestOptions
) => {
  const requestUrl = urlConfig2url(apiConfig);
  return fetch(requestUrl, getRequestOptions(options ?? {}, data)).then(
    response => {
      if (response.ok) {
        return (response.json() as unknown) as T;
      }
      if (response.status === 401) {
        history.push('/login');
      }
      return Promise.reject(response);
    }
  );
};

export default fetchData;
