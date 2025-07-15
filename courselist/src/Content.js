
const Content = ({todo,handleChange,handleDelete}) => {
  return (
    <>
    { (todo.length) ?  (
    <ul className="list">
          { todo.map((item) => {
            return(
            <li key={item.id} className="listitem">
                <input onChange={()=> {handleChange(item.id)}}
                   type="checkbox"
                   checked={item.checked}
                />
                <p>{item.item}</p>
                <button onClick={()=>handleDelete(item.id)}>delete</button>   
          </li>)})
          }
    </ul> ): <p style={{textAlign:"center",fontSize:"40px",marginTop:"150px"}}>Your List is Empty! </p>
}
    </>
  )
}

export default Content