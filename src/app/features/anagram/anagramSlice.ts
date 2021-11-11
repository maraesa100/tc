import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store'
import axios from 'axios'
import { any } from 'prop-types'
import { createAnagramObject, alphabetiseWord } from '../../../questions/helpers/anagramHelpers'

interface AnagramState {
  loading: boolean,
  hasErrors: boolean,
  hasAnagramData: boolean,
  errorMessage: string,
  anagramData: {
    message: '',
    data: Object,
  },
  anagramSearch: string,
  sortedAnagramSearch: Array<string>

}

const initialState: AnagramState = {
  loading: false,
  hasErrors: false,
  hasAnagramData: false,
  errorMessage: '',
  anagramData: {
    message: '',
    data: createAnagramObject(['abase, abased, abasement, abash, abbe, babe'])
  },
  anagramSearch: '',
  sortedAnagramSearch: []
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

    setAnagramSearch: (state, { payload }) => {
      console.log('setting anagram search', payload)
          state.anagramSearch = payload
    },

    submitAnagramSearch: (state) => {
      const searchArray = state.anagramSearch.split(' ');
      searchArray.forEach((i: any) => {
        const alphabetisedWord = alphabetiseWord(i)
        if (!state.sortedAnagramSearch.includes(alphabetisedWord)) {
          state.sortedAnagramSearch.push(alphabetisedWord)
        }
      })
    }
  }
})

export const {
  getAnagram,
  getAnagramFailure,
  getAnagramSuccess,
  setAnagramSearch,
  submitAnagramSearch,
} = anagramSlice.actions

export function getAllAnagramData (): AppThunk {
  
  return (dispatch: any) => {
    dispatch(getAnagram())
    setTimeout(() => {
      console.log('debug', createAnagramObject(['yellow', 'let', 'tell', 'pin', 'nip']))
      // mocks API delay
      axios
        .get('http://www.mieliestronk.com/corncob_lowercase.txt', {
          headers: {
            'Content-Type': 'text/plain'
          }
        })
        .then(result => {
          console.log('the result is', result.data)
          dispatch(getAnagramSuccess(createAnagramObject(result.data)))
        })
        .catch(error => {
          console.log('there was an error')
          dispatch(getAnagramFailure(error.message))
        })
    }, 1000)
  }
}


export const anagramObj = (state: RootState) => state.anagram.anagramData
export const anagramSelectedItemsObj = (state: RootState) => state.anagram.anagramSearch
export const hasAnagram = (state: RootState) => state.anagram.hasAnagramData
export const AnagramRequestLoading = (state: RootState) => state.anagram.loading

export default anagramSlice.reducer
