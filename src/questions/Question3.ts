/*
  A colleague has presented the following Typescript code to you for review.
  What comments would you feed back to the author, and what would be the outcome of your review?
*/

// Comments left inline

import React from 'react'

interface Message {
  count: number
  what: string
}

function sayIt(it: Message): number {
  let count = 0 // rename local variable for clarity
  // e.g. let localCount = 0
  if (it.count < 2) count = 2
    
  else if (it.count < 5) count = 5
  else if (it.count < 10) count = 10
  else if (it.count < 15) count = 15

  // replace if with a rounding function 
  // could then extend the functionality more easily
  // if (it.count >= 2 && it.count <= 15) {
  //  count = Math.ceil(it.count / 5) * 5;
  // }
  

  for (var i = 1; i < count + 1; i += 1) 
    // replace `i +=1` with  `i++`
    // change to `var i = o; i < count; i ++ 1`
    console.log(`[message ${i}] ${it.what}`) // remove
    // console logs should not exist in prod (generally)
    // if this loop only exists for logging (message is not being returned), remove the loop
  
  return count
  // the function is  geared to returning integer series
  // there is no catch all for numbers over 15
}
