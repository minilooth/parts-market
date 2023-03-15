import React from 'react';
import {Divider, List, ListItem, ListItemText, Stack} from '@mui/material';

import {CustomListItemButton} from '@components/common/wrappers/CustomListItemButton';
import {SettingsMenuItem, SettingsTab} from '@core/types/settings';
import {selectIsMenuExpanded} from '@core/store/features/settings';
import {useAppSelector} from '@core/store/hooks';

interface SettingsMenuProps {
  items: Array<Array<SettingsMenuItem>>;
  onTabChange: (_tab: SettingsTab) => void;
  activeTab: SettingsTab;
  width: number;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({items, onTabChange, activeTab, width}) => {
  const visible = useAppSelector(selectIsMenuExpanded);

  if (!visible) {
    return null;
  }

  return (
    <Stack flexBasis={width} bgcolor="background.paper" sx={{overflowY: 'auto'}}>
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