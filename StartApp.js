import React,{useEffect,useState} from 'react'
import { View,Text } from 'react-native'
import SplashScreen from './Components/SplashScreen'
import Drawer from './Navigation/Drawer';
import {Redux} from './Providers/Redux'

const StartApp = (props) => {


   const [splash,setSplash]=useState(true);
 
   useEffect(() => {

     setTimeout(function(){setSplash(false)}, 3000);
   
   },[])
   

   /**
   |--------------------------------------------------
   | If Vendor is Not Loged in
   |--------------------------------------------------
   */
if(!splash){
    return (
        <View style={{flex:1}}>
            <Redux>
         <Drawer />
         </Redux>
        </View>
    )
}
else{
    return (
        <View style={{flex:1}}>
         <SplashScreen />
        </View>
    ) 
}
}

export default StartApp


