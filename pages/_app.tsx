import React from 'react';
import {AppProps} from 'next/app'
import Head from "next/head";
import {CacheProvider} from "@emotion/react";
import {EmotionCache} from "@emotion/cache";
import {toast, ToastContainer} from "react-toastify";
import {Backdrop, CircularProgress} from "@mui/material";
import {Provider} from "react-redux";
import {SWRConfig} from 'swr';

import createEmotionCache from "core/createEmotionCache";
import {AXIOS_COMPLETE_EVENT_NAME, AXIOS_LOADING_EVENT_NAME} from "core/consts/axios";
import store from "core/store";
import {Toast} from "core/types/common";

import 'styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css';

const clientSideEmotionCache = createEmotionCache();

// const logger: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config) => {
//   const extendedFetcher = (...args: unknown[]) => {
//     console.log('SWR Request:', key)
//     return fetcher(...args)
//   }
//   return useSWRNext(key, extendedFetcher, config);
// }

interface CustomAppProps extends AppProps<{ fallback: any, toasts: Array<Toast> }> {
  emotionCache: EmotionCache;
}

const CustomApp = ({Component, emotionCache = clientSideEmotionCache, pageProps}: CustomAppProps) => {
  const [loading, setLoading] = React.useState(false);

  const {fallback, toasts, ...props} = pageProps;

  React.useEffect(() => {
    window.addEventListener(AXIOS_LOADING_EVENT_NAME, handleAxiosLoading);
    window.addEventListener(AXIOS_COMPLETE_EVENT_NAME, handleAxiosComplete);
    return () => {
      window.removeEventListener(AXIOS_LOADING_EVENT_NAME, handleAxiosLoading);
      window.removeEventListener(AXIOS_COMPLETE_EVENT_NAME, handleAxiosComplete);
    }
  }, [])

  React.useEffect(() => {
    toasts?.forEach(({ message, type }) => toast(message, { type }))
  }, [toasts])

  const handleAxiosLoading = () => {
    setLoading(true);
  }

  const handleAxiosComplete = () => {
    setLoading(false);
  }

  return (
    <CacheProvider value={emotionCache}>
      <SWRConfig value={{fallback: fallback || {}, /*use: [swrMiddleware]*/}}>
        <Provider store={store}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width"/>
          </Head>
          <Component {...props} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Backdrop
            sx={{zIndex: 9999}}
            open={loading}
            id="backdrop"
          >
            <CircularProgress
              sx={{
                color: '#eeeeee'
              }}
              size={40}
            />
          </Backdrop>
        </Provider>
      </SWRConfig>
    </CacheProvider>
  )
}

export default CustomApp;