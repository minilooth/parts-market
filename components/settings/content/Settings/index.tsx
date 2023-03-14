import React from "react";
import {Divider, Typography} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import {useRouter} from "next/router";

import {SettingsMenuItem, SettingsTab} from "@core/types/settings";
import {Page} from "@components/common/page/Page";
import {PageHeader} from "@components/common/page/PageHeader";
import {PageContent} from "@components/common/page/PageContent";
import {SettingsMenu} from "@components/settings/content/SettingsMenu";
import {SettingsContent} from "@components/settings/content/SettingsContent";

interface SettingsProps {
  menuWidth: number;
  items: Array<Array<SettingsMenuItem>>
}

export const Settings: React.FC<SettingsProps> = ({menuWidth, items}) => {
  const router = useRouter();
  const { query } = router;
  const activeTab = query.tab as SettingsTab || SettingsTab.MAKES;

  const handleActiveTabChange = async (tab: SettingsTab) => {
    await router.push({
      pathname: router.pathname,
      query: {tab}
    })
  };

  return (
    <Page>
      <PageHeader>
        <SettingsIcon fontSize="large"/>
        <Typography variant="h4" fontWeight={500}>
          Settings
        </Typography>
      </PageHeader>
      <PageContent>
        <SettingsMenu
          items={items}
          onTabChange={handleActiveTabChange}
          activeTab={activeTab}
          width={menuWidth}
        />
        <Divider orientation="vertical"/>
        <SettingsContent activeTab={activeTab}/>
      </PageContent>
    </Page>
  )
}