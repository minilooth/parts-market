import React from "react";
import {SvgIconComponent} from "@mui/icons-material";
import {Typography} from "@mui/material";
import {SvgIconTypeMap} from "@mui/material/SvgIcon/SvgIcon";
import {TypographyTypeMap} from "@mui/material/Typography/Typography";

interface PageHeaderProps {
  Icon?: SvgIconComponent;
  iconProps?: SvgIconTypeMap['props'];
  typographyProps?: Omit<TypographyTypeMap['props'], 'height' | 'maxHeight' | 'minHeight' | 'lineHeight'>;
  title: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ Icon, iconProps, typographyProps, title }) => {
  return (
    <Typography height={64} {...typographyProps}>
      {Icon && <Icon {...iconProps}/>}{title}
    </Typography>
  )
}