/*
  A colleague has presented the following Typescript code to you for review.
  What comments would you feed back to the author, and what would be the outcome of your review?
*/

import React from 'react'

interface Message {
  count: number
  what: string
}

function sayIt(it: Message): number {
  let count = 0
  if (it.count < 2) count = 2
  else if (it.count < 5) count = 5
  else if (it.count < 10) count = 10
  else if (it.count < 15) count = 15

  for (var i = 1; i < count + 1; i += 1)
    console.log(`[message ${i}] ${it.what}`)
  return count
}
