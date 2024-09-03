import { SWRConfiguration } from 'swr';
import Axios from './apiConfig';

export const fetcher = async (url: string) => {
  const res = await Axios.get(url);
  return res.data;
};

export const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  revalidateOnMount: true,
  refreshWhenOffline: true,
  shouldRetryOnError: false,
};
