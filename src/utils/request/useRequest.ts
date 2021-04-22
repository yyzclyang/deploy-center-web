import useSWR from 'swr';
import { useContext } from 'react';
import { ApiConfig } from '@/utils/request/apiConfigCenter';
import fetchData, { RequestOptions } from '@/utils/request/fetchData';
import { urlConfig2url } from '@/utils/request/requestUtil';
import { Context } from '@/store';

const useRequest = <T = Record<string, any>>(
  apiHostConfig: ApiConfig,
  data?: Record<string, any>,
  options?: RequestOptions
) => {
  const {
    state: { token }
  } = useContext(Context);
  const url = urlConfig2url(apiHostConfig);

  return useSWR([url, token], () =>
    fetchData<T>(apiHostConfig, data, { method: 'get', ...options })
  );
};

export default useRequest;
