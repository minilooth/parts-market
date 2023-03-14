import {GetServerSidePropsContext, NextPageContext} from "next";
import useSWR, {SWRConfiguration} from "swr";

import {Page, Pageable} from "@core/types/common";
import {Api} from "@core/api";
import {Model} from "@core/types";
import {PageableUtils} from "@core/utils/pageable";
import {DefaultSWRConfiguration, ModelsSWRKey} from "@core/consts/swr";

const fetcher = (makeId?: number, pageable?: Pageable, ctx?: NextPageContext | GetServerSidePropsContext) => {
  if (makeId) {
    return Api(ctx).model.getAll(makeId, pageable)
  }
  return Promise.resolve(PageableUtils.getEmptyPage<Model>());
}

export const useModels = (makeId?: number,
                          pageable?: Pageable,
                          options: SWRConfiguration = DefaultSWRConfiguration): Page<Model> => {
  const {data} = useSWR<Page<Model>>(ModelsSWRKey, () => fetcher(makeId, pageable), options);
  return data || PageableUtils.getEmptyPage();
}