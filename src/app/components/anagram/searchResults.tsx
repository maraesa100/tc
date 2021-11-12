import React from 'react'


interface searchResultsProps {
  results?: Array<string>,
  index?: any,
  title?: string,
}

export const SearchResults: React.FC<searchResultsProps> = ({
  results, index, title,
}: searchResultsProps) => {
  return (
    <div key={index}>
      <p className='matched-word'>Your Word:</p>
      <p className='matched-word'>{title}</p>
      <p className='matched-word'>Your Results:</p>
      {results &&
        results.map((title: any) => {
          return <div key={index} className='word-result'>{title.map((i: any) => {
            return (<p>{i}</p>)
            })}</div>
          })} 
    </div>
  )
}
