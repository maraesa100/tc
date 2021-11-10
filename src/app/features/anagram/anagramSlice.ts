import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store'
import axios from 'axios'
import { any } from 'prop-types'

interface AnagramState {
  loading: boolean,
  hasErrors: boolean,
  hasAnagramData: boolean,
  errorMessage: string,
  anagramData: {
    message: '',
    data: Array<string>,
    // data: Array<any>,
    // data: Array<SingleMenuItem>,
  },
  selectedAnagramItems: Array<string>
}

const initialState: AnagramState = {
  loading: false,
  hasErrors: false,
  hasAnagramData: false,
  errorMessage: '',
  anagramData: {
    message: '',
    data: ['abase, abased, abasement, abash']
  },
  selectedAnagramItems: []
}

export const anagramSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    getAnagram: state => {
      state.loading = true
    },
    getAnagramSuccess: (state, { payload }) => {
      state.anagramData = payload
      state.loading = false
      state.hasErrors = false
      state.hasAnagramData = true
    },
    getAnagramFailure: (state, { payload }) => {
      state.errorMessage = payload
      state.loading = false
      state.hasErrors = false
    },
    modifySelectedAnagramItems: (state, { payload }) => {
      switch (payload.type) {
        case 'add':
          if (state.selectedAnagramItems.includes(payload.id)) {
          } else {
            state.selectedAnagramItems.push(payload.id)
          }
          break
        case 'remove':
          const idx = state.selectedAnagramItems.indexOf(payload.id)
          state.selectedAnagramItems = state.selectedAnagramItems.filter(
            (item, i) => i !== idx
          )
          break
      }
    }
  }
})

export const {
  getAnagram,
  getAnagramFailure,
  getAnagramSuccess,
  modifySelectedAnagramItems
} = anagramSlice.actions

export function getAllAnagramData (): AppThunk {
  
  return (dispatch: any) => {
    dispatch(getAnagram())
    setTimeout(() => {
      console.log('we got anagram data')
      // mocks API delay
      axios
        .get('http://www.mieliestronk.com/corncob_lowercase.txt', {
          headers: {
            'Content-Type': 'text/plain'
          }
        })
        .then(result => {
          console.log('the result is', result.data)
          dispatch(getAnagramSuccess(result.data))
        })
        .catch(error => {
          console.log('there was an error')
          dispatch(getAnagramFailure(error.message))
        })
    }, 1000)
  }
}

export function getFilteredanagramDataFromAPI(anagramQuery: string): AppThunk {
  return (dispatch: any) => {
    dispatch(getAnagram())
    setTimeout(() => {
      // mocks API delay
      axios
        .get('http://localhost:8080/api/meals/' + anagramQuery)
        .then(result => {
          dispatch(getAnagramSuccess(result.data))
        })
        .catch(error => {
          dispatch(getAnagramFailure(error.message))
        })
    }, 1000)
  }
}

export const anagramObj = (state: RootState) => state.anagram.anagramData
export const anagramSelectedItemsObj = (state: RootState) => state.anagram.selectedAnagramItems
export const hasAnagram = (state: RootState) => state.anagram.hasAnagramData
export const AnagramRequestLoading = (state: RootState) => state.anagram.loading

export default anagramSlice.reducer
