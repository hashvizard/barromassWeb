import React,{useEffect,useState,useContext} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Bookings from './Bookings';
import Home from './Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Bottombar=(props) => {
  
    
const Tab = createBottomTabNavigator();


    return (
    <Tab.Navigator
    initialRouteName="Home"
    lazy={true}

    tabBarOptions={{
        style:{borderTopWidth:2},
        activeTintColor:"green",
     showLabel:true,
     labelPosition:"beside-icon",
     keyboardHidesTabBar:true,
    }}
    >
      <Tab.Screen 
      
      options={{
               unmountOnBlur:true,
        showIcon:true,
       
        tabBarIcon: ({ color, size,focused }) => {
         
          return(
            <Icon name="hiking"
             color={color} size={size} />
          )},
      }}
      name="Home" component={Home} />
      <Tab.Screen
       options={{
        unmountOnBlur:true,
        showIcon:true,
       
        tabBarIcon: ({ color, size,focused }) => {
         
          return(
            <Icon name="calendar"
             color={color} size={size} />
          )},
      }}
      
      name="Bookings" component={Bookings} />
    </Tab.Navigator>
  );
}
export default Bottombar