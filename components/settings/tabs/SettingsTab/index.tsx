import React from "react";
import {Box, Stack, Typography} from "@mui/material";

interface SettingsTabProps {
  children: React.ReactNode;
  title: string;
  direction?: "row" | "column"
}

export const SettingsTab: React.FC<SettingsTabProps> = ({children, title, direction = "column"}) => {
  return (
    <Stack direction={direction} height="100%" rowGap={1}>
      <Typography variant="h5" component="h5" fontWeight={500}>
        {title}
      </Typography>
      <Box height="100%">
        {children}
      </Box>
    </Stack>
  )
}