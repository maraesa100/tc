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
      <h2>{title}</h2>
        <p key={index}></p>
      {results &&
        results.map((title: any) => {
          return <p className='title'>{title.map((i: any) => {
            return (<p>{i}</p>)
            })}</p>
          })}
        
</div>
  )
}
