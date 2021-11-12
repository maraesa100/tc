import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { AppThunk, RootState } from '../../store'
import axios from 'axios'
import { any } from 'prop-types'
import { createAnagramObject, alphabetiseWord, createValidAnagramObject } from '../../../questions/helpers/anagramHelpers'
var wordList = require('word-list-json');

interface AnagramState {
  loading: boolean,
  hasErrors: boolean,
  hasAnagramData: boolean,
  errorMessage: string,
  anagramData: Object,
  anagramSearchString: string,
  alphabetisedAnagramSearch: Array<string>,
  validAnagrams: any,
  topScore: number,
}

const initialState: AnagramState = {
  loading: false,
  hasErrors: false,
  hasAnagramData: false,
  errorMessage: '',
  anagramData: {},
  anagramSearchString: '',
  alphabetisedAnagramSearch: [],
  validAnagrams: {},
  topScore: 0,
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
          state.anagramSearchString = payload
    },

    submitAnagramSearch: (state) => {
      const { anagramSearchString, anagramData } = state;
      
      const validAg = createValidAnagramObject(anagramSearchString, current(anagramData))
      let searchTopScore = 0;
      
      const validAgKeys = Object.keys(validAg);

      validAgKeys.forEach(item => {
        if (item.length > searchTopScore) {
          searchTopScore = item.length;
        }
      })

      if (state.topScore < searchTopScore) {
        state.topScore = searchTopScore;
      }

      state.validAnagrams = validAg;
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
export const validAnagramObj = (state: RootState) => state.anagram.validAnagrams
export const topScore = (state: RootState) => state.anagram.topScore

export default anagramSlice.reducer
