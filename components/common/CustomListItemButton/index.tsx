import React from "react";
import {ListItemButton} from "@mui/material";

interface CustomListItemButtonProps {
  children: NonNullable<React.ReactNode>;
  onClick: (_: React.MouseEvent) => void
  selected: boolean;
}

export const CustomListItemButton: React.FC<CustomListItemButtonProps> = ({children, onClick, selected}) => {
  return (
    <ListItemButton
      onClick={onClick}
      selected={selected}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)'
        },
        '&.Mui-selected::after': {
          right: 0,
          content: '\'\'',
          display: 'block',
          width: '5px',
          top: '0',
          position: 'absolute',
          bgcolor: 'primary.main',
          height: '100%'
        },
        '&.Mui-selected:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.08)'
        },
        '&:hover:after': {
          height: '100%',
          top: 0
        },
        '&::after': {
          right: 0,
          content: '\'\'',
          display: 'block',
          width: '5px',
          top: '50%',
          position: 'absolute',
          bgcolor: 'primary.main',
          transition: 'height 0.5s ease 0s, top 0.5s ease 0s',
          height: 0
        },
      }}
    >
      {children}
    </ListItemButton>
  )
}