import React, { useState,useContext,useEffect } from 'react'

export const AddTripContext =React.createContext();



const AddTripProvider = (props) =>{

const [Itenary,setItenaery]=useState([]);

useEffect(() => {
    
    return () => {
        setItenaery([])
    }
}, [])
        return (
            <AddTripContext.Provider value={{
                Itenary:Itenary,
                setItenaery:setItenaery,
              
                 }}> 
                  {props.children}
                  
                 </AddTripContext.Provider>
        )
    
}


const ProductConsumer = AddTripContext.Consumer;
    
export {AddTripProvider,ProductConsumer};
