import React from "react";
import {Stack} from "@mui/material";

export const Page: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <Stack
      direction="column"
      alignItems="stretch"
      flex={1}
      paddingTop={1}
    >{children}</Stack>
  )
}