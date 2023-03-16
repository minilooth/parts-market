import React from 'react';
import {Stack} from '@mui/material';

import {SettingsTab} from '@core/types/settings';
import {MakesTab} from '@components/settings/tabs/make/MakesTab';
import {ModelsTab} from '@components/settings/tabs/model/ModelsTab';
import {GenerationsTab} from '@components/settings/tabs/generation/GenerationsTab';
import {EngineTypesTab} from '@components/settings/tabs/engine-type/EngineTypesTab';
import {BodyTypesTab} from '@components/settings/tabs/body-type/BodyTypesTab';
import {TransmissionTypesTab} from '@components/settings/tabs/transmission-type/TransmissionTypesTab';
import {CategoriesTab} from '@components/settings/tabs/category/CategoriesTab';
import {SubcategoriesTab} from '@components/settings/tabs/subcategory/SubcategoriesTab';
import {GroupsTab} from '@components/settings/tabs/group/GroupsTab';
import {CitiesTab} from '@components/settings/tabs/city/CitiesTab';
import {AddressesTab} from '@components/settings/tabs/address/AddressesTab';
import {ManufacturersTab} from '@components/settings/tabs/manufacturer/ManufacturersTab';

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
      case SettingsTab.ENGINE_TYPES:
        return <EngineTypesTab/>
      case SettingsTab.BODY_TYPES:
        return <BodyTypesTab/>
      case SettingsTab.TRANSMISSION_TYPES:
        return <TransmissionTypesTab/>
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
    <Stack flex={1} padding={2}>
      {renderActiveTab(activeTab)}
    </Stack>
  )
}