import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { modifySelectedMenuItems } from '../../features/anagram/anagramSlice'

interface MenuItemProps {
  button?: boolean
  id?: string
  _id?: string
  name: string
  dietaries: Array<string>
  createdAt?: string
  updatedAt?: string
  keyID: number
}

export const SingleMenuItemComponent: React.FC<MenuItemProps> = ({
  button,
  id,
  _id,
  name,
  dietaries,
  createdAt,
  updatedAt,
  keyID
}: MenuItemProps) => {
  const dispatch = useDispatch()

  const clickSelect = (idVal: number) => {
    dispatch(modifySelectedMenuItems({ type: 'add', id: idVal}))
  }

  const clickRemove = (idVal: number) => {
    dispatch(modifySelectedMenuItems({ type: 'remove', id: idVal}))
  }
  
  return (
    <li className='item' key={keyID} id={keyID.toString()}>
      <div onClick={() => {clickSelect(keyID)}}>
        <h2>{name}</h2>
        <p>
          {dietaries.map((name, i) => {
            return <span className='dietary'>{name}</span>
          })}
        </p>
      </div>
      {button && <button className='remove-item' onClick={() => { clickRemove(keyID) }} >x</button>}
    </li>
  )
}
