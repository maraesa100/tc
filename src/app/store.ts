import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import anagramReducer from './features/anagram/anagramSlice'

export const store = configureStore({
  reducer: {
    anagram: anagramReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
