import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Content from './Content';
import Insert from './Insert';
import Search from './Search';
import Apioperations from './Apioperations';

function App() {

  const API_URL = "http://localhost:3500/items"

  const [addItem,setAddItem] = useState("")
  const [todo,setTodo] = useState([])
  const [search,setSearch] = useState("")
  const [fetchError, setFetchError] = useState(null)
  const [loading,setLoading] = useState(true)

  useEffect(() =>
  {
    // const displaylist = JSON.parse(localStorage.getItem("todo_list"))
    // if(displaylist)
    // {  
    //   setTodo(displaylist)
    // }
    const fetchitems = async() =>{
      try{
      const response = await fetch (API_URL)
      if(!response.ok)
      {
         throw Error ("Data not Recieved!")
      } 
      const respons = await response.json()
      setTodo(respons)
      setFetchError(null)
    }catch(err){
      setFetchError(err.message)
    }finally{
      setLoading(false)  
    }
  }
    setTimeout(() => (async() => fetchitems())() , 3000 )
  } , [])

  const addingItem = async(item) =>{
     const sid = todo.length? Number(todo[todo.length - 1].id) + 1 : 1
     const id = String(sid)
     const addeditem = {
      id,
      checked:false,
      item
     }
     const updatedlist = [...todo,addeditem]
     setTodo(updatedlist)
    //  localStorage.setItem("todo_list",JSON.stringify(updatedlist))
    const addfromapi = {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(addeditem)
    }
    const result = await Apioperations(API_URL,addfromapi)
    if(result)
    {
      setFetchError(result)
    }
  }

  const handleChange = async(id) =>{
    const edited = todo.map((item) => (item.id===id) ? {...item,checked:!item.checked} : item)
    setTodo(edited)
    const edititem = edited.filter((item)=> (item.id===id))
    // localStorage.setItem("todo_list",JSON.stringify(edited))
    const patchobj = {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({checked:edititem[0].checked})
    }
    const upd_URL = `${API_URL}/${id}`
    const result = await Apioperations(upd_URL,patchobj)
    if(result)
    {
      setFetchError(result)
    }
    }

  const handleDelete = async(id) =>{
    const updated = todo.filter( (item) => item.id!==id ) 
    setTodo(updated)
    // localStorage.setItem("todo_list",JSON.stringify(updated))

    const deleteobj = {
      method:"DELETE"
    }
    const upd_URL=`${API_URL}/${id}` 
    const result = await Apioperations(upd_URL,deleteobj)
    if(result)
    {
      setFetchError(result)
    }
    }
  

  const handleAdd = (e) =>{
    e.preventDefault()
    // const id = todo.length? todo[todo.length - 1].id + 1 : 1
    // const newitem = addItem
    // console.log(newitem)
    // const addeditem = {
    //   id,
    //   checked:false,
    //   newitem
    //  }
    //  const updatedlist = [...todo,addeditem]
    //  setTodo(updatedlist)
    if (addItem) 
      { addingItem(addItem) }
    else 
      return;
    setAddItem("")
  }


  return (
    <>
      <Header 
          title={"Course-List"}
      />
      <Insert
          addItem={addItem}
          setAddItem={setAddItem}
          handleAdd={handleAdd}
      />
      <Search
          search={search}
          setSearch={setSearch}
      />
      <main>
        {fetchError && <p style={{textAlign:"center",fontSize:"40px",marginTop:"150px"}}>{`${fetchError}`}</p>}
        {loading && <p style={{textAlign:"center",fontSize:"40px",marginTop:"150px"}}>Loading...</p>}
        {!fetchError && !loading && 
          <Content
          todo={todo.filter((item) => (
            item.item.toLowerCase().includes(search.toLowerCase())
          ))}
          handleChange={handleChange}
          handleDelete={handleDelete}
          />
        }
      </main>
    </>
  );
}

export default App;
