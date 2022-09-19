import React from 'react'
import { StyleSheet,Animated,StatusBar } from 'react-native'
import { createStackNavigator,TransitionPresets,CardStyleInterpolators } from '@react-navigation/stack';
import FirstPage from "../AddDetails/FirstPage";
import Colors from '../Constants/Colors';
import Categories from '../AddDetails/Categories';
import AddCategories from '../AddDetails/AddCategories';
import Locations from '../AddDetails/Locations';
import AddLocations from '../AddDetails/AddLocations';
import PopularTrips from '../AddDetails/PopularTrips';
import AddTrips from '../AddDetails/AddTrips';
import AddAdmin from '../AddDetails/AddAdmin';
import AddBanner from '../AddDetails/AddBanner';
import Banners from '../AddDetails/Banners';




const Trips = (props) => {

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
                  headerStyle: {
                    backgroundColor: Colors.primary,
                   },title:"My Bookings"
              
                
                
                }}
                headerShown={true}
                name="Categories"
                component={Categories}
                
               
              />


              
<Stack.Screen 
                options={{headerShown:false,
                  headerStyle: {
                    backgroundColor: Colors.primary,
                   },title:"My Bookings"
              
                
                
                }}
                headerShown={true}
                name="PopularTrips"
                component={PopularTrips}
                
               
              />

<Stack.Screen 
                options={{headerShown:false,
                  headerStyle: {
                    backgroundColor: Colors.primary,
                   },title:"My Bookings"
              
                
                
                }}
                headerShown={true}
                name="Banners"
                component={Banners}
                
               
              />



<Stack.Screen 
                options={{headerShown:true,
                  headerStyle: {
                    backgroundColor: Colors.primary,
                   },title:"Add Banner"
              
                
                
                }}
              
                name="AddBanners"
                component={AddBanner}
                
               
              />

<Stack.Screen 
                options={{headerShown:false,
                  headerStyle: {
                    backgroundColor: Colors.primary,
                   },title:"My Bookings"
              
                
                
                }}
                headerShown={true}
                name="Locations"
                component={Locations}
                
               
              />

<Stack.Screen 
                options={{headerShown:true,
                  headerStyle: {
                    backgroundColor: Colors.primary,
                   },title:"Add Category"
              
                
                
                }}
                
                name="AddCategory"
                component={AddCategories}
                
               
              />


<Stack.Screen 
                options={{headerShown:true,
                  headerStyle: {
                    backgroundColor: Colors.primary,
                   },title:"Add Locations"
              
                
                
                }}
                
                name="AddLocations"
                component={AddLocations}
                
               
              />

<Stack.Screen 
                options={{headerShown:true,
                  headerStyle: {
                    backgroundColor: Colors.primary,
                   },title:"Baaromaas Admin"
              
                
                
                }}
                
                name="AddAdmin"
                component={AddAdmin}
                
               
              />

<Stack.Screen 
                options={{headerShown:false,
                  headerStyle: {
                    backgroundColor: Colors.primary,
                   },title:"Add Trips"
              
                
                
                }}
                
                name="AddTrips"
                component={AddTrips}
                
               
              />

              </Stack.Navigator>
              </>
    )
}

export default Trips

const styles = StyleSheet.create({})
