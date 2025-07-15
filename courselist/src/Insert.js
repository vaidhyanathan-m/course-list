import React, { useRef } from 'react'

const Insert = ({addItem,setAddItem,handleAdd}) => {
  const inputRef=useRef()
  return (
    <form className='insert' onSubmit={handleAdd}>
        <input 
           autoFocus
           ref={inputRef}
           type="text"
           id='insertform'
           required
           placeholder='Add New Item'
           value={addItem}
           onChange={(e) => {setAddItem(e.target.value)}}
        /> 
        <button onClick={() => inputRef.current.focus()} type="submit">Add</button>  
    </form>
  )
}

export default Insert