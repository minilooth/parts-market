import React from "react";
import {Divider, List, ListItem, ListItemText, Stack} from "@mui/material";

import {CustomListItemButton} from "components/common/CustomListItemButton";
import {SettingsMenuItem, SettingsTab} from "core/types/settings";

interface SettingsMenuProps {
  items: Array<Array<SettingsMenuItem>>;
  onTabChange: (_tab: SettingsTab) => void;
  activeTab: SettingsTab;
  width: number;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({items, onTabChange, activeTab, width}) => {
  return (
    <Stack minWidth={width} width={width} bgcolor="background.paper">
      {items.map((array, index) => (
        <React.Fragment key={index}>
          {!!index && <Divider/>}
          <List>
            {array.map(({title, key}, index) => (
              <ListItem key={index} disablePadding>
                <CustomListItemButton
                  onClick={() => onTabChange(key)}
                  selected={activeTab === key}
                >
                  <ListItemText primary={title}/>
                </CustomListItemButton>
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      ))}
    </Stack>
  )
}