import {GetServerSidePropsContext, NextPageContext} from 'next';
import useSWR, {SWRConfiguration} from 'swr';

import {Api} from '@core/api';
import {BodyTypesSWRKey, DefaultSWRConfiguration} from '@core/consts/swr';
import {BodyType} from '@core/types';

const fetcher = (ctx?: NextPageContext | GetServerSidePropsContext) =>
  Api(ctx).bodyType.getAll();

export const useBodyTypes = (options: SWRConfiguration = DefaultSWRConfiguration): Array<BodyType> => {
  const {data} = useSWR<Array<BodyType>>(BodyTypesSWRKey, () => fetcher(), options);
  return data || [];
}