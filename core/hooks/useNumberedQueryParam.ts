import {useRouter} from 'next/router';

export const useNumberedQueryParam = (key: string) => {
  const router = useRouter();
  const query = router.query;
  const value = query[key] as string;
  return Number.parseInt(value);
}