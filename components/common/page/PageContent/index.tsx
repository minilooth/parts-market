import React from "react";
import {Paper, Stack} from "@mui/material";

import styles from 'components/common/page/PageContent/PageContent.module.scss';

export const PageContent: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <Paper elevation={2} className={styles.wrapper}>
      <Stack direction="row" height="100%" width="100%" minHeight="700px">
        {children}
      </Stack>
    </Paper>
  )
}