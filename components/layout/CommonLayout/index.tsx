import React from 'react';
import Head from 'next/head'

interface CommonLayoutProps {
  title?: string;
}

export const CommonLayout: React.FC<React.PropsWithChildren<CommonLayoutProps>> = ({children, title = 'Next App'}) => {
  return (
    <>
      <Head>
        <meta name="description" content="Best auto parts store. We are selling parts for you."/>
        <meta name="robots" content="theme, follow"/>
        <title>{title ? `${title} | AutoParts` : title}</title>
      </Head>
      {children}
    </>
  )
}