import React from "react";
import {DataGridProps} from "@mui/x-data-grid";

import {Optional, Page} from "@core/types/common";

export enum SettingsTab {
  MAKES = "makes",
  MODELS = "models",
  GENERATIONS = "generations",
  TRANSMISSIONS = "transmissions",
  ENGINES = "engines",
  BODY_TYPES = "body-types",
  CATEGORIES = "categories",
  SUBCATEGORIES = "subcategories",
  GROUPS = "groups",
  CITIES = "cities",
  ADDRESSES = "addresses",
  MANUFACTURERS = "manufacturers"
}

export interface SettingsMenuItem {
  title: string,
  key: SettingsTab
}

export interface SettingsTabTableProps<T> {
  selection: Optional<T>;
  onRefreshClick: (_: React.MouseEvent) => void;
  onUnselectClick: (_: React.MouseEvent) => void;
  rows: Page<T>;
  columns: DataGridProps['columns'];
  onPaginationChange: DataGridProps['onPaginationModelChange'];
  onSelectionChange: DataGridProps['onRowSelectionModelChange'];
  rowSelectionModel: DataGridProps['rowSelectionModel'];
  paginationModel: DataGridProps['paginationModel'];
}

export interface SettingsTabFormProps<T> {
  selection: Optional<T>;
  onSave: (model: T, callback: () => void) => void | Promise<void>;
  onDelete: (model: T, callback: () => void) => void | Promise<void>;
}