import React from 'react';
import type {AppProps} from 'next/app'
import Head from "next/head";
import {CacheProvider} from "@emotion/react";
import {EmotionCache} from "@emotion/cache";
import {ToastContainer} from "react-toastify";
import {Backdrop, CircularProgress} from "@mui/material";

import createEmotionCache from "core/createEmotionCache";
import {AXIOS_COMPLETE_EVENT_NAME, AXIOS_LOADING_EVENT_NAME} from "core/consts/axios";

import 'styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css';

const clientSideEmotionCache = createEmotionCache();

interface CustomAppProps extends AppProps {
  emotionCache: EmotionCache;
}

export default function App({Component, pageProps, emotionCache = clientSideEmotionCache}: CustomAppProps) {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(AXIOS_LOADING_EVENT_NAME, handleAxiosLoading);
    window.addEventListener(AXIOS_COMPLETE_EVENT_NAME, handleAxiosComplete);
    return () => {
      window.removeEventListener(AXIOS_LOADING_EVENT_NAME, handleAxiosLoading);
      window.removeEventListener(AXIOS_COMPLETE_EVENT_NAME, handleAxiosComplete);
    }
  }, [])

  const handleAxiosLoading = () => {
    setLoading(true);
  }

  const handleAxiosComplete = () => {
    setLoading(false);
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width"/>
      </Head>
      <Component {...pageProps} />
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
        sx={{ zIndex: 9999 }}
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
    </CacheProvider>
  )
}
