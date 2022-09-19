import React, { useContext,useEffect } from 'react';
import { View, StyleSheet,Image,Alert, SafeAreaView,Text,TouchableOpacity,Linking} from 'react-native';
import {AppContext} from '../Providers/AppProvider'
import {ReduxContext} from '../Providers/Redux'


import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { Drawer,Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Constants/Colors';
import * as RootNavigation from '../RootNavigation'
import Facebook from '../Login/Facebook';
export function DrawerContent(props) {
   
const Screens=useContext(ReduxContext);

const userinfo=useContext(AppContext);




    return(<SafeAreaView style={styles.drawerContent}>
       
                 <View style={styles.Logotop}>
                        <Image source={require('../Assets/Main.png')}
                        style={{aspectRatio:16/9,width:"100%",resizeMode:"contain"}}
                        />

                         
             
                 </View>
            
                 <Drawer.Section style={styles.drawerSection} />
<View style={{flexDirection:"row",justifyContent:'space-between',
borderColor:"#FFA500",
paddingHorizontal:20,paddingVertical:10}}>
  
  <TouchableOpacity
  onPress={()=>Linking.openURL('https://www.facebook.com/Baaromaas')}
  >
  <Icon 
name="facebook" 
color="#3b5998"
size={30}
/>
  </TouchableOpacity>

  <TouchableOpacity
  onPress={()=>Linking.openURL('https://www.instagram.com/baaromaas_travel/')}
  >
  <Icon 
name="instagram" 
color="#F56040"
size={30}
/>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={()=>Linking.openURL('whatsapp://send?text=How can we Help you&phone=+91 8650646568')}
      >
  <Icon 
name="whatsapp" 
color="#075e54"
size={30}
/>
      </TouchableOpacity>
   
</View>

{/**
|--------------------------------------------------
| OPtions Available For Vendor
|--------------------------------------------------
*/}

<View style={{
borderColor:"#FFA500",
paddingHorizontal:10,marginVertical:15,display:userinfo.userid == ''?"none":"flex"}}>
<Button
icon="logout"

onPress={()=>userinfo.logout()}

style={{backgroundColor:Colors.nAVY_BLUE}}
mode="contained">
  Log-out
  </Button>
</View>

<View style={{backgroundColor:"white",flex:1}}>

<Drawer.Section style={styles.drawerSection} />
<DrawerContentScrollView

{...props} showsVerticalScrollIndicator={false} >



{/**
|--------------------------------------------------
| Inside Option
|--------------------------------------------------
*/}


<DrawerItem                     
icon={({color, size}) => (
 <Icon 
name="home-outline" 
color={color}
size={30}
/>
 )}
label="Log-in"
style={{backgroundColor:Screens.active == "Login"?Colors.Orange:null,
display:userinfo.userid == ''?"flex":"none"
,borderRadius:10,marginBottom:10}}
onPress={() => {
  Screens.setactive("Login");
props.navigation.navigate('Login')}}

/>


<DrawerItem                     
icon={({color, size}) => (
 <Icon 
name="home-outline" 
color={color}
size={30}
/>
 )}
label="Baaromaas"
style={{backgroundColor:Screens.active == "Home"?Colors.Orange:null,borderRadius:10,marginBottom:10}}
onPress={() => {
  Screens.setactive("Home");
props.navigation.navigate('Start')}}

/>


<DrawerItem                     
icon={({color, size}) => (
 <Icon 
name="plus-box" 
color={color}
size={30}
/>
 )}
label="Add Details"
style={{backgroundColor:Screens.active == "AddTrips"?Colors.Orange:null,
display:userinfo.Admin?"flex":"none",
borderRadius:10,marginBottom:10}}
onPress={() => {
  Screens.setactive("AddTrips");
props.navigation.navigate('AddTrips')}}

/>



<DrawerItem                     
icon={({color, size}) => (
 <Icon 
name="calendar-clock" 
color={color}
size={30}
/>

 )}
label="Upcoming Bookings"
style={{backgroundColor:Screens.active == "New"?Colors.Orange:null,
display:userinfo.Admin?"flex":"none",
borderRadius:10,marginBottom:10}}
onPress={() => {
  Screens.setactive("New");
props.navigation.navigate('New')}}

/>



<DrawerItem                     
icon={({color, size}) => (
 <Icon 
name="calendar-check" 
color={color}
size={30}
/>
 )}
label="Past Bookings"
style={{backgroundColor:Screens.active == "Past"?Colors.Orange:null,
display:userinfo.Admin?"flex":"none",borderRadius:10,marginBottom:10}}
onPress={() => {
  Screens.setactive("Past");
props.navigation.navigate('Past')}}

/>

<DrawerItem                     
icon={({color, size}) => (
 <Icon 
name="close-circle" 
color={color}
size={30}
/>
 )}

label="Cancellation Policy"
style={{backgroundColor:Screens.active == "Cancel"?Colors.Orange:null,borderRadius:10,marginBottom:10}}
onPress={() => {
  Screens.setactive("Cancel");
props.navigation.navigate('Cancelation')
}}
/>

<DrawerItem                     
icon={({color, size}) => (
 <Icon 
name="fingerprint" 
color={color}
size={30}
/>
 )}

label="Privacy Policy"
style={{backgroundColor:Screens.active == "Privacy"?Colors.Orange:null,borderRadius:10,marginBottom:10}}
onPress={() => {
  Screens.setactive("Privacy");
props.navigation.navigate('Privacy')
}}
/>

<DrawerItem                     
icon={({color, size}) => (
 <Icon 
name="lock-outline" 
color={color}
size={30}
/>
 )}

label="Terms & Conditions"
style={{backgroundColor:Screens.active == "Terms"?Colors.Orange:null,borderRadius:10,marginBottom:10}}
onPress={() => {
  Screens.setactive("Terms");
props.navigation.navigate('Terms')
}}
/>




<DrawerItem   
             
icon={({color, size}) => (
 <Icon 
name="email-outline" 
color={color}
size={30}
/>
 )}
 
label="Contact-us"
style={{backgroundColor:Screens.active == "Contact"?Colors.Orange:null,borderRadius:10,marginBottom:10}}
onPress={() => {
  Screens.setactive("Contact");
props.navigation.navigate('Contact')
}}
/>





</DrawerContentScrollView>

</View>

    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
      backgroundColor:"white"
    },
    Logotop:{
       alignItems:"center",
                flexDirection:"row",
                   width:"100%" ,marginTop:40,marginBottom:10
                     
    },


 
 
  });