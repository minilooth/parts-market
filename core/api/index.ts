import {MakeApi} from "core/api/services/make";
import {GetServerSidePropsContext, NextPageContext} from "next";
import {Axios} from "../axios";

interface ApiReturnType {
  make: ReturnType<typeof MakeApi>;
}

export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const apis = {
    make: MakeApi
  }

  return Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(Axios())
    };
  }, {} as ApiReturnType);
}