import {GetServerSidePropsContext, NextPageContext} from "next";

import {MakeApi} from "core/api/services/make";
import {Axios} from "core/axios";
import {AuthApi} from "core/api/services/auth";
import {ModelApi} from "./services/models";

interface ApiReturnType {
  make: ReturnType<typeof MakeApi>;
  model: ReturnType<typeof ModelApi>
  auth: ReturnType<typeof AuthApi>;
}

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const apis = {
    make: MakeApi,
    model: ModelApi,
    auth: AuthApi
  }

  return Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(Axios())
    };
  }, {} as ApiReturnType);
}