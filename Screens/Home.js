import React from 'react'
import { StyleSheet,Animated,StatusBar } from 'react-native'
import { createStackNavigator,TransitionPresets,CardStyleInterpolators } from '@react-navigation/stack';
import FirstPage from "../Home/Firstpage";
import Colors from '../Constants/Colors';
import LocationTrips from '../Home/LocationTrips';
import CategoryTrips from '../Home/CategoryTrips';
import SearchTrips from '../Home/SearchTrips';
import TripDescription from '../Home/TripDescription';
import Booking from '../Home/Booking';
import BookingTrip from '../Home/BookingTrip';

import AddIteneray from '../EditTrip/AddIteneray';
import FirstStep from '../EditTrip/FirstStep'
import { AddTripProvider } from '../Providers/AddTripProvider';
import EditTripDates from '../Home/EditTripDates';
import DateEdit from '../Home/DateEdit';
import AddDates from '../Home/AddDates';
import MobileLogin from '../LoginBook/MobileLogin';
import OtpVerification from '../LoginBook/Otp/components/otp/OtpVerification';
const Home = (props) => {

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
 <AddTripProvider>
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
                   },
              
                
                
                }}
                headerShown={false}
                name="FirstPage"
                component={FirstPage}
                
               
              />

<Stack.Screen 
                
              
                   options={({ route }) => ({ title: route.params.location ,headerShown:true, ...TransitionPresets.ModalSlideFromBottomIOS, 
                     headerStyle: {
                    backgroundColor:Colors.primary,
                  
                    },headerTintColor: '#fff'}
                   
                    
                    )}
                
              
                name="Location"
                component={LocationTrips}
                
               
              />

<Stack.Screen 
                
              
                   options={({ route }) => ({ title: route.params.category ,headerShown:true, ...TransitionPresets.ModalSlideFromBottomIOS, 
                     headerStyle: {
                    backgroundColor:Colors.primary,
                  
                    },headerTintColor: '#fff'}
                   
                    
                    )}
                
              
                headerShown={false}
                name="Category"
                component={CategoryTrips}
                
               
              />

<Stack.Screen 
options={{headerShown:false}}
name="Search"
component={SearchTrips}
/>

<Stack.Screen name="AddDates" 
           component={AddDates} 
           options={({ route }) => {({title: route.params.name })}}
           options={{headerShown:false}}   
           
           />

<Stack.Screen 
options={{headerShown:false,
  ...TransitionPresets.ModalSlideFromBottomIOS ,
 }}
name="Tripdescription"
component={TripDescription}
/>

<Stack.Screen 
options={{headerShown:true,
  headerStyle: {
    backgroundColor:Colors.primary,
   
    },headerTintColor: '#fff',
    title:"Booking your Trip",
  ...TransitionPresets.ModalSlideFromBottomIOS ,
 }}

name="Book"
component={Booking}
/>

<Stack.Screen 
options={{headerShown:false}}
name="Booked"
component={BookingTrip}
/>


<Stack.Screen name="FirstStep" 
        component={FirstStep} 
        options={{
            headerShown:false,
            title: "Edit trip",
            cardStyle:{backgroundColor:"white"}
        }}
           
        
        />
       <Stack.Screen name="DateSave" 
           component={DateEdit} 
           options={({ route }) => {({title: route.params.name })}}
           options={{headerShown:false}}   
           
           />
<Stack.Screen name="EditTrip" 
        component={EditTripDates} 
        options={{
            headerShown:false,
            title: "EditTrip",
            cardStyle:{backgroundColor:"white"}
        }}
           
        
        />

    <Stack.Screen 
                
              
                options={({ route }) => ({ title: `Day ${route.params.category}` ,headerShown:true, ...TransitionPresets.ModalSlideFromBottomIOS, 
                  headerStyle: {
                 backgroundColor:Colors.primary,
               
                 },headerTintColor: '#fff'}
                
                 
                 )}
             
           
             headerShown={false}
             name="Itenary"
             component={AddIteneray}
             
            
           />
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
              </AddTripProvider>
              </>
    )
}

export default Home

const styles = StyleSheet.create({})
