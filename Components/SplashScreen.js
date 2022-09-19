import React from 'react'
import {Image, View,StatusBar} from 'react-native'

const SplashScreen = () => {
    return (
    <View style={{flex:1,backgroundColor:"white",alignItems:"center",justifyContent:'center'}}>
           <StatusBar hidden={true} />
            <Image source={require('../Assets/Main.png')}
            
            style={{width:300,height:300,resizeMode:"contain"}}
           />
      
    </View>
     )
}

export default SplashScreen


