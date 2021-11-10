import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import menuReducer from './features/anagram/anagramSlice'

export const store = configureStore({
  reducer: {
    menu: menuReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
