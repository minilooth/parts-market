import React from "react";
import {Box} from "@mui/material";

import {SettingsTab} from "core/types/settings";
import {MakesTab} from "components/settings/tabs/make/MakesTab";
import {ModelsTab} from "components/settings/tabs/ModelsTab";
import {GenerationsTab} from "components/settings/tabs/GenerationsTab";
import {EnginesTab} from "components/settings/tabs/EnginesTab";
import {BodyTypesTab} from "components/settings/tabs/BodyTypesTab";
import {TransmissionsTab} from "components/settings/tabs/TransmissionsTab";
import {CategoriesTab} from "components/settings/tabs/CategoriesTab";
import {SubcategoriesTab} from "components/settings/tabs/SubcategoriesTab";
import {GroupsTab} from "components/settings/tabs/GroupsTab";
import {CitiesTab} from "components/settings/tabs/CitiesTab";
import {AddressesTab} from "components/settings/tabs/AddressesTab";
import {ManufacturersTab} from "components/settings/tabs/ManufacturersTab";

interface SettingsContentProps {
  activeTab: SettingsTab;
}

export const SettingsContent: React.FC<SettingsContentProps> = ({ activeTab }) => {
  const renderActiveTab = (key: SettingsTab) => {
    switch (key) {
      case SettingsTab.MAKES:
        return <MakesTab/>
      case SettingsTab.MODELS:
        return <ModelsTab/>
      case SettingsTab.GENERATIONS:
        return <GenerationsTab/>
      case SettingsTab.ENGINES:
        return <EnginesTab/>
      case SettingsTab.BODY_TYPES:
        return <BodyTypesTab/>
      case SettingsTab.TRANSMISSIONS:
        return <TransmissionsTab/>
      case SettingsTab.CATEGORIES:
        return <CategoriesTab/>
      case SettingsTab.SUBCATEGORIES:
        return <SubcategoriesTab/>
      case SettingsTab.GROUPS:
        return <GroupsTab/>
      case SettingsTab.CITIES:
        return <CitiesTab/>
      case SettingsTab.ADDRESSES:
        return <AddressesTab/>
      case SettingsTab.MANUFACTURERS:
        return <ManufacturersTab/>
    }
  }

  return (
    <Box width="100%" height="100%" padding={2}>
      {renderActiveTab(activeTab)}
    </Box>
  )
}