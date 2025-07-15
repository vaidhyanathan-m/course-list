const Search = ({search,setSearch}) => {
  return (
    <form className="Search" onSubmit={(e)=>e.preventDefault()}>
        <input 
           type="text"
           placeholder='Search'
           id="searchform"
           required
           value={search}
           onChange={(e)=> setSearch(e.target.value) }
        />
    </form>
  )
}

export default Search