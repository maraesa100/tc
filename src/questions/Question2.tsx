/* 
  Make a React app which
    - accepts a list of words
    - generates "valid" anagrams of each word
    - where "valid" means any word in this wordlist (to be fetched at runtime): http://www.mieliestronk.com/corncob_lowercase.txt

  Bonus points: make the app fun to use (like a game), especially if the user finds a word with many anagrams.
*/

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  getAllAnagramData,
  setAnagramSearch,
  submitAnagramSearch,
  validAnagramObj,
  AnagramRequestLoading,
  topScore
} from '../app/features/anagram/anagramSlice'
import Loader from 'react-loader-spinner'

import { SearchResults } from '../app/components/anagram/searchResults'

const Question2 = () => {
  const dispatch = useDispatch()
  const validAnagrams = useSelector(validAnagramObj)
  const appLoading = useSelector(AnagramRequestLoading)
  const gameTopScore = useSelector(topScore)

  useEffect(() => {
    dispatch(getAllAnagramData())
  }, [dispatch])

  const updateSearchString = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAnagramSearch(event.target.value))
  }

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('we submitted the form')
    dispatch(submitAnagramSearch())
  }

  return (
    <>
      {appLoading && (
        <div>
          <h1 className="app-title">Anagram Finder</h1>
          <Loader type="BallTriangle" color='#1AD798' height={200} width={200} />
          <p>Loading...</p>
        </div>
      )}
      {!appLoading && (
        <>
          <p>The top score is: {gameTopScore}</p>
        <h1>
          Anagram Sorter
            <form onSubmit={e => submitSearch(e)}>
                <div>
                  <p>Search for words below</p>
                </div>
              <input placeholder={"still the mind"} type='text' onChange={e => updateSearchString(e)} />
            <input type='submit' value='Submit' />
          </form>
          {validAnagrams &&
            Object.keys(validAnagrams).map((item, index) => {
              const arrayofString = item.split(',')
              return (
                <div key={`validAnagrams${index}`}>
                  <SearchResults
                    results={validAnagrams[item]}
                    index={index}
                    title={item}
                  />
                </div>
              )
            })}
          </h1>
          </>
      )}
    </>
  )
}

export default Question2
