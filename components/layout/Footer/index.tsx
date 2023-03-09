import React from "react";
import {Paper, Typography} from "@mui/material";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      elevation={3}
    >
      <Typography variant="subtitle2" component="div" fontWeight={400}>
        This website collects cookies to deliver better user experience. We collect cookies to analyze our website traffic and performance, we never collect any personal data.
      </Typography>
      <Typography variant="subtitle2" component="div" fontWeight={400}>
        &#169; {currentYear} Minsk Belarus, AutoParts Inc. All rights reserved.
      </Typography>
    </Paper>
  )
}