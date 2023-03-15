import {GetServerSidePropsContext, NextPageContext} from 'next';
import useSWR, {SWRConfiguration} from 'swr';

import {Page, Pageable} from '@core/types/common';
import {Api} from '@core/api';
import {PageableUtils} from '@core/utils/pageable';
import {Generation} from '@core/types';
import {DefaultSWRConfiguration, GenerationsSWRKey} from '@core/consts/swr';

const fetcher = (modelId?: number, pageable?: Pageable, ctx?: NextPageContext | GetServerSidePropsContext) => {
  if (modelId) {
    return Api(ctx).generation.getAll(modelId, pageable)
  }
  return Promise.resolve(PageableUtils.getEmptyPage<Generation>());
}

export const useGenerations = (modelId?: number,
                          pageable?: Pageable,
                          options: SWRConfiguration = DefaultSWRConfiguration): Page<Generation> => {
  const {data} = useSWR<Page<Generation>>(GenerationsSWRKey, () => fetcher(modelId, pageable), options);
  return data || PageableUtils.getEmptyPage();
}