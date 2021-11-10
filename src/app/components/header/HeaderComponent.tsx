import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { menuObj, menuSelectedItemsObj } from '../../features/anagram/anagramSlice'

export default function HeaderComponent() {
  // const menu = useSelector(menuObj)
  const selectedItems = useSelector(menuSelectedItemsObj)
  // const dispatch = useDispatch()

  return (
    <div>
      <div className='menu-summary'>
        <div className='container'>
          <div className='row'>
            <div className='col-6 menu-summary-left'>
              <span>{selectedItems && selectedItems.length} items</span>
            </div>
            {/* <div className='col-6 menu-summary-right'>
              6x <span className='dietary'>ve</span>
              4x <span className='dietary'>v</span>
              12x <span className='dietary'>n!</span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
