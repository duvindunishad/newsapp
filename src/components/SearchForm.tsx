import React from 'react'
import './searchform.css'

export default function SearchForm({
    active, 
    formOpen,
}:{
    active: boolean,
    formOpen: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className={`search-form-wrap js-search-form-wrap ${active ? 'active': undefined}` }>
      <form className='search-form'>
        <span className='icon bi-search'></span>
        <input type='text' placeholder='Search' className='form-control'/>
        <button className='btn js-search-close' onClick={formOpen}>
            <span className='bi-x'></span>
        </button>
      </form>
    </div>
  )
}