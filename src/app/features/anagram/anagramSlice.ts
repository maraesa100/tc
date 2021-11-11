import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store'
import axios from 'axios'
import { any } from 'prop-types'
import { createAnagramObject, alphabetiseWord } from '../../../questions/helpers/anagramHelpers'
var wordList = require('word-list-json');

interface AnagramState {
  loading: boolean,
  hasErrors: boolean,
  hasAnagramData: boolean,
  errorMessage: string,
  anagramData: any,
  anagramSearch: string,
  sortedAnagramSearch: Array<string>,
  validAnagrams: Array<string>,
}

const initialState: AnagramState = {
  loading: false,
  hasErrors: false,
  hasAnagramData: false,
  errorMessage: '',
  anagramData: {},
  anagramSearch: '',
  sortedAnagramSearch: [],
  validAnagrams: []
}

export const anagramSlice = createSlice({
  name: 'anagram',
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
          state.anagramSearch = payload
    },

    submitAnagramSearch: (state) => {
      const searchArray = state.anagramSearch.split(' ');
      state.sortedAnagramSearch = [];
      state.validAnagrams = [];
      searchArray.forEach((item: any) => {
        const alphabetisedWord = alphabetiseWord(item)
        if (!state.sortedAnagramSearch.includes(alphabetisedWord) && state.anagramData.hasOwnProperty(`${alphabetisedWord}`)) {
          state.sortedAnagramSearch.push(alphabetisedWord)
          state.validAnagrams.push(state.anagramData[`${alphabetisedWord}`])
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
      console.log('fetching')
      // mocks API delay
      /*  I couldn't get authorization for this so i've implemented it using a module*/
      // axios
      //   .get('http://www.mieliestronk.com/corncob_lowercase.txt', {
      //     headers: {
      //       'Content-Type': 'text/plain'
      //     }
      //   })
      //   .then(result => {
      //     console.log('the result is', result.data)
      //     dispatch(getAnagramSuccess(createAnagramObject(result.data)))
      //   })
      //   .catch(error => {
      //     console.log('there was an error')
      //     dispatch(getAnagramFailure(error.message))
      //   })

      /* gets the first 10,000 words from a word generation module */
      dispatch(getAnagramSuccess(createAnagramObject(wordList.slice(0,10000))))
    }, 1000)
  }
}


export const anagramObj = (state: RootState) => state.anagram.anagramData
export const hasAnagram = (state: RootState) => state.anagram.hasAnagramData
export const AnagramRequestLoading = (state: RootState) => state.anagram.loading
export const sortedAnagramSearchObj = (state: RootState) => state.anagram.sortedAnagramSearch

export default anagramSlice.reducer
