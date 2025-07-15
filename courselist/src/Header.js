import React from 'react'

const Header = ({title}) => {
  const headingStyle={
    backgroundColor:"black",
    color:"white",
    paddingTop:"20px",
    paddingBottom:"20px",
    fontSize:"35px",
    textAlign:"center"
  } 
  return (
    <h1 style={headingStyle}>{title}</h1>
  )
}

Header.defaultProps = {
    title:"Course-List"
}

export default Header