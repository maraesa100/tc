/* 
  Make a React app which
    - accepts a list of words
    - generates "valid" anagrams of each word
    - where "valid" means any word in this wordlist (to be fetched at runtime): http://www.mieliestronk.com/corncob_lowercase.txt

  Bonus points: make the app fun to use (like a game), especially if the user finds a word with many anagrams.
*/

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getAllAnagramData, anagramObj } from '../app/features/anagram/anagramSlice'

const Question2 = () => {
  const dispatch = useDispatch()
  const anagrams = useSelector(anagramObj)

  useEffect(() => {
    dispatch(getAllAnagramData())
  }, [dispatch])

  return <h1>Build your app here...
    
    {/* {anagrams.data.map(item => <p>{item}</p>)} */}

  </h1>;
};

export default Question2;
