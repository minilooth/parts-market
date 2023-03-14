import {GetServerSidePropsContext, GetServerSidePropsResult} from "next";

import {User} from "core/types";
import {Api} from "core/api";
import {SessionSWRKey} from "./consts/swr";

type IncomingGSSP<P> = (ctx: GetServerSidePropsContext, user?: User) => Promise<P>;

type WithAuthSSPResult = GetServerSidePropsResult<{ [key: string]: any }> & { fallback?: any };

type WithAuthSSPOptions = {
  authorizationNeeded?: boolean,
  authorities?: Array<string>,
  canAccessAuthorized?: boolean
};

export const withAuthSSP = (
  incomingGSSP?: IncomingGSSP<WithAuthSSPResult> | null,
  options: WithAuthSSPOptions = {authorizationNeeded: false, authorities: [], canAccessAuthorized: true},
) => {
  return async (ctx: GetServerSidePropsContext): Promise<WithAuthSSPResult> => {

    if (!options.authorizationNeeded) {
      if (incomingGSSP) {
        const incomingGSSPResult = await incomingGSSP(ctx);

        if ('props' in incomingGSSPResult) {
          return {
            props: {...incomingGSSPResult.props }
          };
        }

        if ('redirect' in incomingGSSPResult) {
          return {redirect: {...incomingGSSPResult.redirect}};
        }

        if ('notFound' in incomingGSSPResult) {
          return {notFound: incomingGSSPResult.notFound};
        }
      }

      return {
        props: {}
      }
    }

    const isLoggedIn = await Api(ctx).auth.isLoggedIn();

    if (!isLoggedIn && options.authorizationNeeded) {
      return {
        redirect: {
          destination: "/not-found",
          permanent: true,
        }
      }
    }

    if (isLoggedIn && !options.canAccessAuthorized) {
      return {
        redirect: {
          destination: "/",
          permanent: true
        }
      }
    }

    const user = await Api(ctx).auth.me();

    if (options.authorizationNeeded && !options.authorities?.includes(user.authorities[0].name)) {
      return {
        redirect: {
          destination: "/",
          permanent: true
        }
      }
    }

    const fallback = {
      [SessionSWRKey]: user,
    }

    if (incomingGSSP) {
      const incomingGSSPResult = await incomingGSSP(ctx, user);

      if ('props' in incomingGSSPResult) {
        return {
          props: {...incomingGSSPResult.props, fallback: { ...incomingGSSPResult.fallback, ...fallback } }
        };
      }

      if ('redirect' in incomingGSSPResult) {
        return {redirect: {...incomingGSSPResult.redirect}};
      }

      if ('notFound' in incomingGSSPResult) {
        return {notFound: incomingGSSPResult.notFound};
      }
    }

    return {
      props: {
        fallback
      }
    }
  };
}