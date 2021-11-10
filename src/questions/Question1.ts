/*
  Write a Typescript function which takes some numbers and computes their arithmetic mean.
  Demonstrate it working.
*/

import { sumAcc } from './helpers/mathHelpers'

const Question1 = (num: Array<number>): number => {
  return num.reduce(sumAcc, 0) / num.length
}

export default Question1
