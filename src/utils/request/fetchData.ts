import { ApiConfig } from '@/utils/request/apiConfigCenter';
import { getRequestOptions, urlConfig2url } from '@/utils/request/requestUtil';
import { hideLoading, showLoading } from '@/utils/loadingUtil';
import history from '../history';

export type RequestOptions = Omit<RequestInit, 'body'> & {
  token?: string;
  showLoadingModal?: boolean;
};

const fetchData = <T = Record<string, any>>(
  apiConfig: ApiConfig,
  data?: Record<string, any>,
  options?: RequestOptions
) => {
  const requestUrl = urlConfig2url(apiConfig);
  const showLoadingModal = options?.showLoadingModal ?? true;

  if (showLoadingModal) {
    showLoading();
  }

  return fetch(requestUrl, getRequestOptions(options ?? {}, data)).then(
    response => {
      if (showLoadingModal) {
        hideLoading();
      }

      if (response.ok) {
        return (response.json() as unknown) as T;
      }
      if (response.status === 401) {
        history.push('/login');
      }
      return Promise.reject(response);
    },
    reason => {
      if (showLoadingModal) {
        hideLoading();
      }
      throw reason;
    }
  );
};

export default fetchData;
