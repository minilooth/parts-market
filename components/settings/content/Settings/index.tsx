import {Divider} from "@mui/material";
import React from "react";
import {Settings as SettingsIcon} from "@mui/icons-material"
import {useRouter} from "next/router";

import {SettingsMenuItem, SettingsTab} from "core/types/settings";
import {Page} from "components/common/Page";
import {PageHeader} from "components/common/PageHeader";
import {PageContent} from "components/common/PageContent";
import {SettingsMenu} from "components/settings/content/SettingsMenu";
import {SettingsContent} from "components/settings/content/SettingsContent";

interface SettingsProps {
  menuWidth: number;
  items: Array<Array<SettingsMenuItem>>
}

export const Settings: React.FC<SettingsProps> = ({menuWidth, items}) => {
  const router = useRouter();
  const activeTab = router.query.tab as SettingsTab || SettingsTab.MAKES;

  const handleActiveTabChange = async (tab: SettingsTab) => {
    await router.push({
      pathname: router.pathname,
      query: {tab}
    })
  };

  return (
    <Page>
      <PageHeader
        title="Settings"
        Icon={SettingsIcon}
        iconProps={{
          fontSize: "large"
        }}
        typographyProps={{
          variant: "h4",
          fontWeight: 500,
          sx: {
            display: 'flex',
            alignItems: 'center',
            columnGap: 1,
            flexGrow: 1
          }
        }}
      />
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