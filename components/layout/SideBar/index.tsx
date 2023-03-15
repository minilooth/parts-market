import React from 'react'
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar} from '@mui/material'
import {useRouter} from 'next/router';

import {SideBarItem} from '@core/types/side-bar';
import {CustomListItemButton} from '@components/common/wrappers/CustomListItemButton';

interface SideBarProps {
  items: Array<Array<SideBarItem>>,
  width: number
}

export const SideBar: React.FC<SideBarProps> = ({items, width}) => {
  const router = useRouter();
  const currentPage = router.pathname;

  const handleButtonClick = async (href: string) => {
    if (href !== currentPage) {
      await router.push(href);
    }
  }

  return (
    <Drawer
      sx={{
        width: width,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: width,
          boxSizing: 'border-box',
        },
        position: 'relative',
        zIndex: 1500
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar/>
      {items.map((array, index) => (
        <React.Fragment key={index}>
          <Divider/>
          <List>
            {array.map(({title, Icon, href}, index) => (
              <ListItem key={index} disablePadding>
                <CustomListItemButton
                  onClick={() => handleButtonClick(href)}
                  selected={href === currentPage}
                >
                  <ListItemIcon>
                    <Icon/>
                  </ListItemIcon>
                  <ListItemText primary={title}/>
                </CustomListItemButton>
              </ListItem>
            ))}
          </List>
        </React.Fragment>
      ))}
    </Drawer>
  )
}