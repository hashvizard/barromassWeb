import React from 'react'
import { StyleSheet,Animated,StatusBar } from 'react-native'
import { createStackNavigator,TransitionPresets,CardStyleInterpolators } from '@react-navigation/stack';

import MobileLogin from '../Login/MobileLogin';
import OtpVerification from '../Login/Otp/components/otp/OtpVerification'



const Login = (props) => {

    const Stack = createStackNavigator();


    
  
    return (
      <>
 
        <Stack.Navigator
        animationTypeForReplace="pop"
        initialRouteName="FirstPage"
        headerMode="float"
      
        

        screenOptions={{
         
         
          
         
          ...TransitionPresets.FadeInFromBottomAndroidSpec  ,
           
        }}
          mode="modal"
        >



<Stack.Screen 
           options={{headerShown:false,
            ...TransitionPresets.ModalSlideFromBottomIOS ,
           }}
                headerShown={true}
                name="Mobile"
                component={MobileLogin}
                
               
              />

<Stack.Screen 
           options={{headerShown:false,
            ...TransitionPresets.ModalSlideFromBottomIOS ,
           }}
                headerShown={true}
                name="Otp"
                component={OtpVerification}
                
               
              />


              </Stack.Navigator>
              </>
    )
}

export default Login

const styles = StyleSheet.create({})
