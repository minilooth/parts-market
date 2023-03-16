import {GetServerSidePropsContext, NextPageContext} from 'next';
import useSWR, {SWRConfiguration} from 'swr';

import {Api} from '@core/api';
import {Generation} from '@core/types';
import {DefaultSWRConfiguration, GenerationsSWRKey} from '@core/consts/swr';

const fetcher = (modelId?: number, ctx?: NextPageContext | GetServerSidePropsContext) =>
  Api(ctx).generation.getAll(modelId)

export const useGenerations = (modelId?: number,
                          options: SWRConfiguration = DefaultSWRConfiguration): Array<Generation> => {
  const {data} = useSWR<Array<Generation>>(GenerationsSWRKey, () => fetcher(modelId), options);
  return data || [];
}