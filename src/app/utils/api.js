import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url, params) => {
  const { data } = await axios.get(url, {
    params
  });

  return data;
};

export const useJsonData = (dataPath) => {
  const { data, error } = useSWR(dataPath, fetcher, {
    revalidateOnFocus: false
  });

  return {
    data,
    isLoading: !error && !data,
    hasError: error
  };
};
