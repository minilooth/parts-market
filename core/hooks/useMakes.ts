import {GetServerSidePropsContext, NextPageContext} from "next";
import useImmutableSWR from 'swr/immutable'
import useSWR from 'swr'
import {SWRConfiguration} from "swr";

import {Page, Pageable} from "core/types/common";
import {Api} from "core/api";
import {Make} from "core/types/types";
import {PageableUtils} from "core/utils/pageable";

export const SWR_MAKES_KEY = "makes"

const fetcher = (pageable: Pageable, ctx?: NextPageContext | GetServerSidePropsContext) =>
  Api(ctx).make.getAll(pageable);

export const useMakes = (pageable: Pageable, options?: SWRConfiguration) => {
  const { data, mutate } = useSWR<Page<Make>>(SWR_MAKES_KEY, () => fetcher(pageable), options);
  return {
    data: data || PageableUtils.getEmptyPage(),
    mutate: mutate
  };
}