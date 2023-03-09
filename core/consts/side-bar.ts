import {SideBarItem} from "core/types/side-bar";
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
import {
  CHARTS_ROUTE,
  COMPANY_ROUTE,
  HOME_ROUTE,
  MANUFACTURERS_ROUTE,
  PROVIDERS_ROUTE,
  SETTINGS_ROUTE,
  USERS_ROUTE, VEHICLES_ROUTE
} from "core/consts/routes";

export const SIDE_BAR_WIDTH = 225;

export const SIDE_BAR_ITEMS: Array<Array<SideBarItem>> = [
  [
    {
      title: 'Parts',
      Icon: Build,
      href: HOME_ROUTE
    },
    {
      title: 'Users',
      Icon: Group,
      href: USERS_ROUTE
    },
    {
      title: 'Manufacturers',
      Icon: PrecisionManufacturing,
      href: MANUFACTURERS_ROUTE
    },
    {
      title: 'Providers',
      Icon: LocalShipping,
      href: PROVIDERS_ROUTE
    },
    {
      title: 'Vehicles',
      Icon: DriveEta,
      href: VEHICLES_ROUTE
    }
  ],
  [
    {
      title: 'Settings',
      Icon: Settings,
      href: SETTINGS_ROUTE
    },
    {
      title: 'Company',
      Icon: Work,
      href: COMPANY_ROUTE
    },
    {
      title: 'Charts',
      Icon: BarChart,
      href: CHARTS_ROUTE
    }
  ]
]