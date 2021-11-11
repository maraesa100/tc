// export const alphabetiseWord = (word: string): string => {
//   return word.split("").sort().join("");
// }

// need to convert this to typescript

export const alphabetiseWord = (word)=> {
  return word.split("").sort().join("").toLowerCase();
}

export const createAnagramObject = (arrayOfWords) => {
let newObject = {};
arrayOfWords.map(item => {
  const alphaWord = alphabetiseWord(item)
    if(newObject.hasOwnProperty(alphaWord)) {
      newObject[`${alphaWord}`].push(item)
    } else {
      newObject[`${alphaWord}`] = [item];
    }
})

return newObject
}
