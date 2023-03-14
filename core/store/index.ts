import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'

import settingsSlice from '@core/store/features/settings';

const store = configureStore({
  reducer: {
    [settingsSlice.name]: settingsSlice.reducer,
  },
  devTools: process.env.NODE_ENV === 'development'
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
  >

export default store