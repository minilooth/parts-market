import {SettingsMenuItem, SettingsTab} from "../types/settings";
import {GridColDef} from "@mui/x-data-grid";
import moment from "moment";

export const SETTINGS_MENU_WIDTH = 225

export const SETTINGS_MENU_ITEMS: Array<Array<SettingsMenuItem>> = [
  [
    {
      title: 'Makes',
      key: SettingsTab.MAKES
    },
    {
      title: 'Models',
      key: SettingsTab.MODELS
    },
    {
      title: 'Generations',
      key: SettingsTab.GENERATIONS
    }
  ],
  [
    {
      title: 'Transmissions',
      key: SettingsTab.TRANSMISSIONS
    },
    {
      title: 'Engines',
      key: SettingsTab.ENGINES
    },
    {
      title: 'Body types',
      key: SettingsTab.BODY_TYPES
    }
  ],
  [
    {
      title: 'Categories',
      key: SettingsTab.CATEGORIES
    },
    {
      title: 'Subcategories',
      key: SettingsTab.SUBCATEGORIES
    },
    {
      title: 'Groups',
      key: SettingsTab.GROUPS
    }
  ],
  [
    {
      title: 'Cities',
      key: SettingsTab.CITIES
    },
    {
      title: 'Addresses',
      key: SettingsTab.ADDRESSES
    },
    {
      title: 'Manufacturers',
      key: SettingsTab.MANUFACTURERS
    }
  ]
]

export const MAKES_COLUMNS: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 0.3
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    flex: 0.3,
    valueFormatter: ({value}) => value && moment(value).fromNow()
  },
  {
    field: 'updatedAt',
    headerName: 'Updated',
    flex: 0.3,
    valueFormatter: ({value}) => value && moment(value).fromNow()
  },
]

export const MODELS_COLUMNS: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 0.3
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    flex: 0.3,
    valueFormatter: ({value}) => value && moment(value).fromNow()
  },
  {
    field: 'updatedAt',
    headerName: 'Updated',
    flex: 0.3,
    valueFormatter: ({value}) => value && moment(value).fromNow()
  },
]
