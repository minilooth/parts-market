import React from 'react'
import {Stack} from '@mui/material';
import Image, {StaticImageData} from 'next/image';

import NotFound from '@public/web-page.png'

interface CustomNoRowsOverlayProps {
  text?: string;
  image?: StaticImageData;
}

export const CustomNoRowsOverlay: React.FC<CustomNoRowsOverlayProps> = ({ text = 'No data', image = NotFound }) => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <Image src={image} alt={text} width={128}/>
      {text}
    </Stack>
  )
}