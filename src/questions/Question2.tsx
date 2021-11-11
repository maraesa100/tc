/* 
  Make a React app which
    - accepts a list of words
    - generates "valid" anagrams of each word
    - where "valid" means any word in this wordlist (to be fetched at runtime): http://www.mieliestronk.com/corncob_lowercase.txt

  Bonus points: make the app fun to use (like a game), especially if the user finds a word with many anagrams.
*/

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllAnagramData, anagramObj, setAnagramSearch, submitAnagramSearch, sortedAnagramSearchObj } from '../app/features/anagram/anagramSlice'

const Question2 = () => {
  const dispatch = useDispatch()
  const anagramSortedSearch = useSelector(sortedAnagramSearchObj)
  const validAnagramData = useSelector(anagramObj)

  useEffect(() => {
    dispatch(getAllAnagramData())
  }, [dispatch])

  const updateSearchString = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAnagramSearch(event.target.value))
  }

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('we submitted the form');
    dispatch(submitAnagramSearch());
  }



  return <h1>Anagram Sorter
    <form onSubmit={e => submitSearch(e)}>
        <label>
          Your Words: 
        <input type="text"
          onChange={e => updateSearchString(e)}
          />
        </label>
        <input type="submit" value="Submit" />
    </form>
    
    {anagramSortedSearch.filter((item, i) => validAnagramData.hasOwnProperty(item)).map((name, i) => {
      return (
        <div key={i.toString()}>
          <p>Your Valid Word: {name}</p>
        </div>
      )
    })}

    
    
  </h1>;
};

export default Question2;
