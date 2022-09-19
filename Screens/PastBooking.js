import React from 'react'
import { StyleSheet,Animated,StatusBar } from 'react-native'
import { createStackNavigator,TransitionPresets,CardStyleInterpolators } from '@react-navigation/stack';
import FirstPage from "../PastBookings/FirstPage";
import Colors from '../Constants/Colors';
import TripDetails from '../PastBookings/TripDetails';



const PastBooking = (props) => {

    const Stack = createStackNavigator();

    const forFade = ({ current, next }) => {
      const opacity = Animated.add(
        current.progress,
        next ? next.progress : 0
      ).interpolate({
        inputRange: [0, 1, 2],
        outputRange: [0, 1, 0],
      });
    
      return {
        leftButtonStyle: { opacity },
        rightButtonStyle: { opacity },
        titleStyle: { opacity },
        backgroundStyle: { opacity },
      };
    };
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
                  headerStyle: {
                    backgroundColor: Colors.primary,
                   },title:"My Bookings"
              
                
                
                }}
                headerShown={true}
                name="FirstPage"
                component={FirstPage}
                
               
              />

<Stack.Screen 
options={{headerShown:false,
  ...TransitionPresets.ModalSlideFromBottomIOS ,
 }}
name="TripDetails"
component={TripDetails}
/>

              </Stack.Navigator>
              </>
    )
}

export default PastBooking

const styles = StyleSheet.create({})
