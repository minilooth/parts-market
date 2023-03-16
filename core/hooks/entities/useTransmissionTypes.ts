import {GetServerSidePropsContext, NextPageContext} from 'next';
import useSWR, {SWRConfiguration} from 'swr';

import {Api} from '@core/api';
import {DefaultSWRConfiguration, TransmissionTypesSWRKey} from '@core/consts/swr';
import {TransmissionType} from '@core/types';

const fetcher = (ctx?: NextPageContext | GetServerSidePropsContext) =>
  Api(ctx).transmissionType.getAll();

export const useTransmissionTypes = (options: SWRConfiguration = DefaultSWRConfiguration): Array<TransmissionType> => {
  const {data} = useSWR<Array<TransmissionType>>(TransmissionTypesSWRKey, () => fetcher(), options);
  return data || [];
}