import {createSelector, createSlice} from "@reduxjs/toolkit";

import {AppState} from "@core/store";

export type SettingsState = {
  menuExpanded: boolean;
}

const initialState: SettingsState = {
  menuExpanded: true,
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleMenuExpansion: state => {
      state.menuExpanded = !state.menuExpanded
    },
  }
})

export const { toggleMenuExpansion } = settingsSlice.actions;

const settingsSelector = (state: AppState) => state.settings;

export const selectIsMenuExpanded = createSelector(settingsSelector, state => state.menuExpanded);

export default settingsSlice;