import React from 'react'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface searchResultsProps {
  results?: Array<string>,
  index?: any,
  title?: string,
}

export const SearchResults: React.FC<searchResultsProps> = ({
  results, index, title,
}: searchResultsProps) => {
  return (
    <div key={`search-results-${index}`}>

      <Button color="secondary">{title} : </Button>

      {results &&
        results.map((title: any, i: any) => {
          return <div key={i} className='word-result'>{title.map((innerItem: any) => {
            return (
              <span key={innerItem} className="anagram-button">
                <Button color="success" variant="contained"> {innerItem} </Button>
              </span>
            )
            })}</div>
          })} 
    </div>
  )
}
