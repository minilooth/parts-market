import React from 'react';
import Link from 'next/link';
import {Box, Divider, Typography} from '@mui/material';

import {CommonLayout} from '@components/layout/CommonLayout';
import {HomeRoute} from '@core/consts/routes';

const NotFoundPage: React.FC = () => {
  return (
    <CommonLayout title="Not Found">
      <Box sx={{
        minHeight: '100vh',
        position: 'absolute',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        rowGap: 5
      }}>
        <Box sx={{height: 40, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Typography
            variant="h1"
            component="h1"
            fontSize={24}
            fontWeight={500}
            sx={{marginRight: 2.5}}
          >
            404
          </Typography>
          <Divider orientation="vertical"/>
          <Typography
            variant="h1"
            component="h1"
            fontSize={14}
            fontWeight={400}
            sx={{marginLeft: 2.5}}
          >
            This page could be not found.
          </Typography>
        </Box>
        <Typography
          variant="h1"
          component="h1"
          fontSize={14}
          fontWeight={400}
          sx={{
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          <Link href={HomeRoute}>
            Click here to return to Home page.
          </Link>
        </Typography>
      </Box>
    </CommonLayout>
  )
}

export default NotFoundPage;