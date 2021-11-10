// export const alphabetiseWord = (word: string): string => {
//   return word.split("").sort().join("");
// }

export const alphabetiseWord = (word)=> {
  return word.split("").sort().join("");
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




// alphabetise words
// save these as key: value pairs i.e act: cat
// reduce these into key: anagram1, anagram2
// iterate through a list of words which are sorted alphabetically
// ...  see if you can find matches