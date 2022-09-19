import React,{useEffect,useState,useContext} from 'react'
import { StyleSheet, StatusBar } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from '../Components/DrawerContent';
import Colors from '../Constants/Colors';
import {AppContext} from '../Providers/AppProvider'

import NewBooking from '../Screens/NewBooking'
import PastBooking from '../Screens/PastBooking'

import Contact from '../Screens/Contact';
import Terms from '../Screens/Terms';
import Trips from '../Screens/Trips';
import Bottombar from '../Screens/Bottombar';
import Cancelation from '../Screens/Cancelation';
import Privacy from '../Screens/Privacy';
import Login from '../Screens/Login';


const Drawer = () => {

    const Drawer = createDrawerNavigator();
    const VendorInfo=useContext(AppContext);

    return (<>
       <StatusBar backgroundColor={Colors.Black} />
        <Drawer.Navigator
       
        drawerStyle={{
          backgroundColor: Colors.Black,
          width: 240,
        }}
        initialRouteName="Start"
        drawerContent={props => <DrawerContent {...props}  />}>

        <Drawer.Screen name="Start" component={Bottombar}  options={{unmountOnBlur:true}} />
     
        <Drawer.Screen name="Past" component={PastBooking} options={{unmountOnBlur:true}} />
       
        <Drawer.Screen name="AddTrips" component={Trips}  options={{unmountOnBlur:true}} />
        <Drawer.Screen name="New" component={NewBooking}  options={{unmountOnBlur:true}} />
        <Drawer.Screen name="Terms" component={Terms}  />
        <Drawer.Screen name="Cancelation" component={Cancelation}  />
        <Drawer.Screen name="Privacy" component={Privacy}  />
        <Drawer.Screen name="Contact" component={Contact}  />

        <Drawer.Screen name="Login" component={Login}  options={{unmountOnBlur:true}} />
        
      </Drawer.Navigator>

      </>
    )
    
}

export default Drawer

const styles = StyleSheet.create({})
