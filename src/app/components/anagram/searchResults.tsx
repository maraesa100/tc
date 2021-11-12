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
    <div>
      <p className='matched-word'>{title}</p>
        <p key={index}></p>
      {results &&
        results.map((title: any) => {
          return <div className='word-result'>{title.map((i: any) => {
            return (<p>{i}</p>)
            })}</div>
          })} 
</div>
  )
}
