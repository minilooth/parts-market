import React from "react";
import {Box} from "@mui/material";

interface PageProps {
  children: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ children }) => {
  return (
    <Box flexDirection="column" width="100%" height="100%" rowGap={2}>
      {children}
    </Box>
  )
}