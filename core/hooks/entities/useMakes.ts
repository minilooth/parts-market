import {GetServerSidePropsContext, NextPageContext} from "next";
import useSWR from 'swr'
import {SWRConfiguration} from "swr";

import {Page, Pageable} from "core/types/common";
import {Api} from "core/api";
import {Make} from "core/types";
import {PageableUtils} from "core/utils/pageable";
import {DefaultSWRConfiguration, MakesSWRKey} from "core/consts/swr";

const fetcher = (pageable?: Pageable, ctx?: NextPageContext | GetServerSidePropsContext) =>
  Api(ctx).make.getAll(pageable);

export const useMakes = (pageable?: Pageable, options: SWRConfiguration = DefaultSWRConfiguration): Page<Make> => {
  const {data} = useSWR<Page<Make>>(MakesSWRKey, () => fetcher(pageable), options);
  return data || PageableUtils.getEmptyPage();
}