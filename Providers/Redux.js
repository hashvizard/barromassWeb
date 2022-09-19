import React, { useState,useContext} from 'react'

import {AppContext} from '../Providers/AppProvider'

export const ReduxContext =React.createContext();


const Redux = (props) =>{

const VendorInfo=useContext(AppContext);

const [active,setactive]=useState("Home");



        return (
            <ReduxContext.Provider value={{
              active:active,
              setactive:setactive,
             

                 }}> 
                  {props.children}
                  
                 </ReduxContext.Provider>
        )
    
}


const ProductConsumer = ReduxContext.Consumer;
    
export {Redux,ProductConsumer};
