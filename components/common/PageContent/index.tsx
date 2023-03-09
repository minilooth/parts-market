import React, {ReactNode} from "react";
import {Paper, PaperTypeMap, Stack} from "@mui/material";

import styles from 'components/common/PageContent/PageContent.module.scss';

interface PageContentProps {
  children: ReactNode;
  paperProps?: PaperTypeMap['props']
}

export const PageContent: React.FC<PageContentProps> = ({children, paperProps}) => {
  return (
    <Paper {...paperProps} elevation={2} className={styles.wrapper}>
      <Stack direction="row" height="100%" width="100%">
        {children}
      </Stack>
    </Paper>
  )
}