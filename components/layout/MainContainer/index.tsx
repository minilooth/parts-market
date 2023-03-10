import React from "react";
import {Box} from "@mui/material";

import {Header} from "components/layout/Header";
import {SideBar} from "components/layout/SideBar";
import {SIDE_BAR_ITEMS, SIDE_BAR_WIDTH} from "core/consts/side-bar";
import {Footer} from "components/layout/Footer";

interface MainContainerProps {
  children: NonNullable<React.ReactNode>;
}

export const MainContainer: React.FC<MainContainerProps> = ({children}) => {
  return (
    <React.Fragment>
      <Header/>
      <Box sx={{display: 'flex'}}>
        <SideBar items={SIDE_BAR_ITEMS} width={SIDE_BAR_WIDTH}/>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            height: 'calc(100vh - 64px - 64px)',
            paddingTop: 1,
            paddingBottom: 2,
            paddingLeft: 3,
            paddingRight: 3
          }}
          component="main"
        >
          {children}
        </Box>
      </Box>
      <Footer/>
    </React.Fragment>
  )
}