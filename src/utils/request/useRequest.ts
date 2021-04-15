import useSWR from 'swr';
import { ApiConfig } from '@/utils/request/apiConfigCenter';
import fetchData, { RequestOptions } from '@/utils/request/fetchData';
import { urlConfig2url } from '@/utils/request/requestUtil';

const useRequest = <T = Record<string, any>>(
  apiHostConfig: ApiConfig,
  data?: Record<string, any>,
  options?: RequestOptions
) => {
  const url = urlConfig2url(apiHostConfig);
  return useSWR(url, () =>
    fetchData<T>(apiHostConfig, data, { method: 'get', ...options })
  );
};

export default useRequest;
