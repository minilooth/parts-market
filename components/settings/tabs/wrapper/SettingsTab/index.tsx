import React from "react";
import {Stack, Typography} from "@mui/material";

interface SettingsTabProps {
  title: string;
}

export const SettingsTab: React.FC<React.PropsWithChildren<SettingsTabProps>> = ({children, title}) => {
  return (
    <Stack flex={1} spacing={1}>
      <Typography variant="h5" fontWeight={500}>
        {title}
      </Typography>
      {children}
    </Stack>
  )
}