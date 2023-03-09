import React from "react"
import {Stack} from "@mui/material";
import Image from "next/image";

import NotFound from "public/web-page.png"

interface CustomNoRowsOverlayProps {
  text: string;
}

export const CustomNoRowsOverlay: React.FC<CustomNoRowsOverlayProps> = ({ text }) => {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      <Image src={NotFound} alt={text} width={128}/>
      {text}
    </Stack>
  )
}