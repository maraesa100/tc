import React from 'react'

interface searchResultsProps {
  results?: Array<string>,
  index?: number,
  title?: string,
}

export const SearchResults: React.FC<searchResultsProps> = ({
  results, index, title,
}: searchResultsProps) => {
  return (
    <div key={`search-results-${index}`}>
      <p className='matched-word'>Your Word:</p>
      <p className='matched-word'>{title}</p>
      <p className='matched-word'>Your Results:</p>
      {results &&
        results.map((title: any, i: number) => {
          return <div key={i} className='word-result'>{title.map((innerItem: string) => {
            return (<p key={innerItem} >{innerItem}</p>)
            })}</div>
          })} 
    </div>
  )
}
