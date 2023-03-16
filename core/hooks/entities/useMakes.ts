import {GetServerSidePropsContext, NextPageContext} from 'next';
import useSWR from 'swr'
import {SWRConfiguration} from 'swr';

import {Api} from '@core/api';
import {Make} from '@core/types';
import {DefaultSWRConfiguration, MakesSWRKey} from '@core/consts/swr';

const fetcher = (ctx?: NextPageContext | GetServerSidePropsContext) =>
  Api(ctx).make.getAll();

export const useMakes = (options: SWRConfiguration = DefaultSWRConfiguration): Array<Make> => {
  const {data} = useSWR<Array<Make>>(MakesSWRKey, () => fetcher(), options);
  return data || [];
}