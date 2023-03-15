import React from 'react';
import {Box} from '@mui/material';

import {Header} from '@components/layout/Header';
import {SideBar} from '@components/layout/SideBar';
import {SideBarItems, SideBarWidth} from '@core/consts/side-bar';
import {Footer} from '@components/layout/Footer';

export const MainContainer: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <React.Fragment>
      <Header/>
      <Box display="flex">
        <SideBar items={SideBarItems} width={SideBarWidth}/>
        <Box
          flexGrow={1}
          display="flex"
          height="calc(100vh - 64px - 64px)"
          paddingTop={1}
          paddingBottom={2}
          paddingLeft={3}
          paddingRight={3}
          component="main"
        >{children}</Box>
      </Box>
      <Footer/>
    </React.Fragment>
  )
}