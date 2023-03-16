import {GetServerSidePropsContext, NextPageContext} from 'next';
import useSWR, {SWRConfiguration} from 'swr';

import {Api} from '@core/api';
import {Model} from '@core/types';
import {DefaultSWRConfiguration, ModelsSWRKey} from '@core/consts/swr';

const fetcher = (makeId?: number, ctx?: NextPageContext | GetServerSidePropsContext) =>
  Api(ctx).model.getAll(makeId)

export const useModels = (makeId?: number,
                          options: SWRConfiguration = DefaultSWRConfiguration): Array<Model> => {
  const {data} = useSWR<Array<Model>>(ModelsSWRKey, () => fetcher(makeId), options);
  return data || [];
}