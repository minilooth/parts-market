import React from 'react';
import {AppProps} from 'next/app'
import Head from 'next/head';
import {CacheProvider} from '@emotion/react';
import {EmotionCache} from '@emotion/cache';
import {toast, ToastContainer} from 'react-toastify';
import {Backdrop, CircularProgress} from '@mui/material';
import {Provider} from 'react-redux';
import {SWRConfig} from 'swr';

import createEmotionCache from '@core/createEmotionCache';
import {AxiosCompleteEventName, AxiosLoadingEventName} from '@core/consts/axios';
import store from '@core/store';
import {Toast} from '@core/types/common';

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
    window.addEventListener(AxiosLoadingEventName, handleAxiosLoading);
    window.addEventListener(AxiosCompleteEventName, handleAxiosComplete);
    return () => {
      window.removeEventListener(AxiosLoadingEventName, handleAxiosLoading);
      window.removeEventListener(AxiosCompleteEventName, handleAxiosComplete);
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
          <ToastContainer draggable/>
          <Backdrop
            sx={{zIndex: 9999}}
            open={loading}
          >
            <CircularProgress
              sx={{color: '#eeeeee'}}
              size={40}
            />
          </Backdrop>
        </Provider>
      </SWRConfig>
    </CacheProvider>
  )
}

export default CustomApp;