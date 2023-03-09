import React from "react";
import {AppBar, Box, Divider, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import {Logout} from "@mui/icons-material";

import Logo from "public/logo.png"
import {HOME_ROUTE} from "core/consts/routes";

import styles from 'components/layout/Header/Header.module.scss';

export const Header: React.FC = () => {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar
        position="static"
        color="transparent"
        sx={{
          backgroundColor: 'white',
          position: 'relative',
          zIndex: 2000,
          boxShadow: 'none'
        }}
      >
        <Toolbar>
          <Link href={HOME_ROUTE}>
            <Image src={Logo} alt="AutoParts" height="32" className={styles.image}/>
          </Link>

          <Box sx={{marginLeft: 2, flexGrow: 1}}>
            <Typography variant="h6" component="div" sx={{lineHeight: 1.125}}>
              AutoParts
            </Typography>
            <Typography variant="caption" component="div">
              Best auto parts store. We are selling parts for you.
            </Typography>
          </Box>

          {/*<Button color="inherit">Login</Button>*/}
          <Box display="flex" columnGap={1.5} justifyContent="center" alignItems="center">
            <Tooltip title="Profile" componentsProps={{popper: {sx: {zIndex: 2001}}}}>
              <Typography variant="subtitle1" component="span" fontWeight={400} className={styles.fullName}>
                Moroz Matvei Dmitrievich
              </Typography>
            </Tooltip>
            <Tooltip title="Logout">
              <IconButton>
                <Logout/>
              </IconButton>
            </Tooltip>
          </Box>

        </Toolbar>
      </AppBar>
      <Divider/>
    </Box>
  )
}