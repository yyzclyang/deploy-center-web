import useSWR from 'swr';
import { useContext } from 'react';
import { ApiConfig } from '@/utils/request/apiConfigCenter';
import fetchData, { RequestOptions } from '@/utils/request/fetchData';
import { urlConfig2url } from '@/utils/request/requestUtil';
import { GlobalContext } from '@/store';

const useRequest = <T = Record<string, any>>(
  apiConfig: ApiConfig,
  data?: Record<string, any>,
  options?: RequestOptions
) => {
  const {
    state: { token }
  } = useContext(GlobalContext);
  const url = urlConfig2url(apiConfig);

  return useSWR([url, token], () =>
    fetchData<T>(apiConfig, data, { method: 'get', token, ...options })
  );
};

export default useRequest;
