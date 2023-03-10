import React from "react";
import {Stack} from "@mui/material";

export const PageHeader: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <Stack
      height={64}
      flexGrow={1}
      direction="row"
      alignItems="center"
      spacing={1}
    >{children}</Stack>
  )
}