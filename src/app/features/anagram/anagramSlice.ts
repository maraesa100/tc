import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store'
import axios from 'axios'
import { any } from 'prop-types'

export interface SingleMenuItem {
  id: number,
  name: string,
  dietaries: Array<string>,
  createdAt: Date,
  updatedAt: Date,
}

interface MenuState {
  loading: boolean,
  hasErrors: boolean,
  hasMenuData: boolean,
  errorMessage: string,
  menuData: {
    message: '',
    data: Array<SingleMenuItem>,
  },
  selectedMenuItems: Array<string>
}

const initialState: MenuState = {
  loading: false,
  hasErrors: false,
  hasMenuData: false,
  errorMessage: '',
  menuData: {
    message: '',
    data: []
  },
  selectedMenuItems: []
}

export const anagramSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    getMenu: state => {
      state.loading = true
    },
    getMenuSuccess: (state, { payload }) => {
      state.menuData = payload
      state.loading = false
      state.hasErrors = false
      state.hasMenuData = true
    },
    getMenuFailure: (state, { payload }) => {
      state.errorMessage = payload
      state.loading = false
      state.hasErrors = false
    },
    modifySelectedMenuItems: (state, { payload }) => {
      switch (payload.type) {
        case 'add':
          if (state.selectedMenuItems.includes(payload.id)) {
          } else {
            state.selectedMenuItems.push(payload.id)
          }
          break
        case 'remove':
          const idx = state.selectedMenuItems.indexOf(payload.id)
          state.selectedMenuItems = state.selectedMenuItems.filter(
            (item, i) => i !== idx
          )
          break
      }
    }
  }
})

export const {
  getMenu,
  getMenuFailure,
  getMenuSuccess,
  modifySelectedMenuItems
} = anagramSlice.actions

export function getAllMenuData(): AppThunk {
  return (dispatch: any) => {
    dispatch(getMenu())
    setTimeout(() => {
      // mocks API delay
      axios
        .get('http://localhost:8080/api/meals/')
        .then(result => {
          dispatch(getMenuSuccess(result.data))
        })
        .catch(error => {
          dispatch(getMenuFailure(error.message))
        })
    }, 1000)
  }
}

export function getFilteredMenuDataFromAPI(menuQuery: string): AppThunk {
  return (dispatch: any) => {
    dispatch(getMenu())
    setTimeout(() => {
      // mocks API delay
      axios
        .get('http://localhost:8080/api/meals/' + menuQuery)
        .then(result => {
          dispatch(getMenuSuccess(result.data))
        })
        .catch(error => {
          dispatch(getMenuFailure(error.message))
        })
    }, 1000)
  }
}

export const menuObj = (state: RootState) => state.menu.menuData
export const menuSelectedItemsObj = (state: RootState) =>
  state.menu.selectedMenuItems
export const hasMenu = (state: RootState) => state.menu.hasMenuData
export const MenuRequestLoading = (state: RootState) => state.menu.loading

export default anagramSlice.reducer
