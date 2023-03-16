import useSWR, {SWRConfiguration} from 'swr';
import {GetServerSidePropsContext, NextPageContext} from 'next';

import {Api} from '@core/api';
import {DefaultSWRConfiguration, EngineTypesSWRKey} from '@core/consts/swr';
import {EngineType} from '@core/types';

const fetcher = (ctx?: NextPageContext | GetServerSidePropsContext) =>
  Api(ctx).engineType.getAll();

export const useEngineTypes = (options: SWRConfiguration = DefaultSWRConfiguration): Array<EngineType> => {
  const {data} = useSWR<Array<EngineType>>(EngineTypesSWRKey, () => fetcher(), options);
  return data || [];
}