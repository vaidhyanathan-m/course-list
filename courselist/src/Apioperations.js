
const Apioperations = async(URL="",objModel=null,errorMsg=null) => {
    try{
    const response = await fetch (URL,objModel)
    if(!response.ok)
    {
        throw Error ("data not recieved")
    }
    }catch(err){
        errorMsg=err.Message;
    }
    finally{
        return errorMsg
    }
}

export default Apioperations