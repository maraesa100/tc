// export const alphabetiseWord = (word: string): string => {
//   return word.split("").sort().join("");
// }

// need to convert this to typescript

export const alphabetiseWord = word => {
  return word
    .split('')
    .sort()
    .join('')
    .toLowerCase()
}

export const createAnagramObject = arrayOfWords => {
  let newObject = {}
  arrayOfWords.map(item => {
    const alphaWord = alphabetiseWord(item)
    if (newObject.hasOwnProperty(alphaWord)) {
      newObject[`${alphaWord}`].push(item)
    } else {
      newObject[`${alphaWord}`] = [item]
    }
  })

  return newObject
}

export const createValidAnagramObject = (anagramSearchString, anagrams) => {
  const words = anagramSearchString.split(' ')
  const arrayOfWords = [...new Set(words)]
  let newObject = {}
  arrayOfWords.map(item => {
    const alphaWord = alphabetiseWord(item)
    if (
      !anagrams.hasOwnProperty(alphaWord) ||
      newObject.hasOwnProperty(alphaWord)
    ) {
      return
    }
    let strippedAlphaWord = anagrams[`${alphaWord}`].slice()
    const index = strippedAlphaWord.indexOf(item)
    strippedAlphaWord.splice(index, 1)
    newObject[`${item}`] = [strippedAlphaWord]
  })
  return newObject
}
