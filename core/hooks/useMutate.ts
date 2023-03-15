import {useSWRConfig} from 'swr';

export const useMutate = () => {
  const { mutate } = useSWRConfig();
  return mutate;
}