import {NextPage} from "next";

import {MainContainer} from "components/layout/MainContainer";
import {CommonLayout} from "components/layout/CommonLayout";
import {Settings} from "components/settings/content/Settings";
import {SETTINGS_MENU_ITEMS, SETTINGS_MENU_WIDTH} from "../core/consts/settings";

const SettingsPage: NextPage = () => {
  return (
    <CommonLayout title='Settings'>
      <MainContainer>
        <Settings menuWidth={SETTINGS_MENU_WIDTH} items={SETTINGS_MENU_ITEMS}/>
      </MainContainer>
    </CommonLayout>
  )
}

export default SettingsPage;