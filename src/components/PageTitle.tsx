import React from 'react'
import './pagetitle.css'

export default function PageTitle({title}: {title:string}) {
  return (
   <h3 className='category-title'>{title}</h3>
  )
}
