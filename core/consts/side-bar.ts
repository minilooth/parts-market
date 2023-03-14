import {
  BarChart,
  Build,
  DriveEta,
  Group,
  LocalShipping,
  PrecisionManufacturing,
  Settings,
  Work
} from "@mui/icons-material";

import {SideBarItem} from "@core/types/side-bar";
import {
  ChartsRoute,
  CompanyRoute,
  HomeRoute,
  ManufacturersRoute,
  ProvidersRoute,
  SettingsRoute,
  UsersRoute, VehiclesRoute
} from "@core/consts/routes";

export const SideBarWidth = 225;

export const SideBarItems: Array<Array<SideBarItem>> = [
  [
    {
      title: 'Parts',
      Icon: Build,
      href: HomeRoute
    },
    {
      title: 'Users',
      Icon: Group,
      href: UsersRoute
    },
    {
      title: 'Manufacturers',
      Icon: PrecisionManufacturing,
      href: ManufacturersRoute
    },
    {
      title: 'Providers',
      Icon: LocalShipping,
      href: ProvidersRoute
    },
    {
      title: 'Vehicles',
      Icon: DriveEta,
      href: VehiclesRoute
    }
  ],
  [
    {
      title: 'Settings',
      Icon: Settings,
      href: SettingsRoute
    },
    {
      title: 'Company',
      Icon: Work,
      href: CompanyRoute
    },
    {
      title: 'Charts',
      Icon: BarChart,
      href: ChartsRoute
    }
  ]
]