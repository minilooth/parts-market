import React from 'react';
import {DataGridProps} from '@mui/x-data-grid';

import {Optional, Page} from '@core/types/common';

export enum SettingsTab {
  MAKES = 'makes',
  MODELS = 'models',
  GENERATIONS = 'generations',
  TRANSMISSION_TYPES = 'transmission-types',
  ENGINE_TYPES = 'engine-types',
  BODY_TYPES = 'body-types',
  CATEGORIES = 'categories',
  SUBCATEGORIES = 'subcategories',
  GROUPS = 'groups',
  CITIES = 'cities',
  ADDRESSES = 'addresses',
  MANUFACTURERS = 'manufacturers'
}

export interface SettingsMenuItem {
  title: string,
  key: SettingsTab
}

export interface SettingsTabTableProps<T> {
  selection: Optional<T>;
  onRefreshClick: React.MouseEventHandler<HTMLButtonElement>;
  onUnselectClick: React.MouseEventHandler<HTMLButtonElement>;
  rows: Page<T>;
  columns: DataGridProps['columns'];
  onPaginationModelChange: DataGridProps['onPaginationModelChange'];
  onRowSelectionModelChange: DataGridProps['onRowSelectionModelChange'];
  rowSelectionModel: DataGridProps['rowSelectionModel'];
  paginationModel: DataGridProps['paginationModel'];
}

export interface SettingsTabFormProps<T> {
  selection: Optional<T>;
  onSave: (model: T, callback: VoidFunction) => void | Promise<void>;
  onDelete: (model: T, callback: VoidFunction) => void | Promise<void>;
}