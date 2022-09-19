import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import FirstStep from '../Add_Trips/FirstStep'
import Colors from '../Colors';


import { AddTripProvider } from '../Providers/AddTripProvider';
import AddIteneray from '../Add_Trips/AddIteneray';


const AddTrips = () => {



    const Stack = createStackNavigator();


    return (<AddTripProvider>
     
     <Stack.Navigator 
     screenOptions={{
         
         
        headerTintColor:Colors.wHITE,
        headerStyle: {
            backgroundColor: Colors.App_back,
          },
       
      }}
     
     >
     
        <Stack.Screen name="FirstStep" 
        component={FirstStep} 
        options={{
            headerShown:false,
            title: "Let's add a trip",
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



      </Stack.Navigator>
      </AddTripProvider>       
    )
}

export default AddTrips

const styles = StyleSheet.create({})
