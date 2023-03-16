import {GridColDef} from '@mui/x-data-grid';
import moment from 'moment';

import {SettingsMenuItem, SettingsTab} from '@core/types/settings';

export const SettingsMenuWidth = 225

export const SettingsMenuItems: Array<Array<SettingsMenuItem>> = [
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
      title: 'Transmission Types',
      key: SettingsTab.TRANSMISSION_TYPES
    },
    {
      title: 'Engine Types',
      key: SettingsTab.ENGINE_TYPES
    },
    {
      title: 'Body Types',
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

export const MakesColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1,
    align: 'center',
    headerAlign: 'center',
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

export const ModelsColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1,
    align: 'center',
    headerAlign: 'center',
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

export const GenerationsColumns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 0.1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 0.18333
  },
  {
    field: 'issuedFrom',
    headerName: 'Issued From',
    flex: 0.18333
  },
  {
    field: 'issuedTo',
    headerName: 'Issued To',
    flex: 0.18333
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    flex: 0.18333,
    valueFormatter: ({value}) => value && moment(value).fromNow()
  },
  {
    field: 'updatedAt',
    headerName: 'Updated',
    flex: 0.18333,
    valueFormatter: ({value}) => value && moment(value).fromNow()
  },
]

export const StartYear = 1960;
export const YearsAscending = Array.from(Array(new Date().getFullYear() - StartYear + 1).keys())
  .map(value => ({ value: value + StartYear }));
export const YearsDescending = [...YearsAscending].reverse();
