import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, Text, View,StatusBar,Image,TouchableOpacity ,Keyboard, ActivityIndicator} from 'react-native'

import { TextInput,Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Constants/Colors'


const MobileLogin = (props) => {


const [Verify,setVerify]=useState(false);

const [Wrong,setWrong]=useState(false);

const [Mobile,setMobile]=useState("");

useEffect(() => {
 
    setMobile("")
    setVerify(false);
    setWrong(false);

    return () => {
        setMobile("")
    setVerify(false);
    setWrong(false);
    }
}, [])



    return (
        <View style={{flex:1,backgroundColor:Colors.Black}}>
            <StatusBar hidden={false} backgroundColor="#f7f7f7" barStyle="dark-content" />
          
          
 <View style={{flex:1,backgroundColor:Colors.White,
         justifyContent:"space-around",
       padding:20}}>
          <View style={{flexDirection:"row",alignItems:"center"}}>
              
              <TouchableOpacity onPress={()=>{
                Keyboard.dismiss()
                props.navigation.openDrawer()}}>
            <Icon name="menu" size={30} style={{marginRight:15}} />
            </TouchableOpacity>
         <Image  source={require('../Assets/Main.png')}
          style={{width:100,height:100,aspectRatio:1/1,resizeMode:"contain"}} />
          </View>
               <Text style={{fontSize:25,color:"#292b2c"}}>Log in to Baaromaas Travel</Text>
               <Text style={{fontSize:14,color:Colors.GREEN}}>Enter Your Mobile Number </Text>
          <TextInput placeholder="9876543210"
          mode="outlined"
          label="+91"
          autoFocus={true}
          style={{borderColor:"BLACK"}}
          onChangeText={text=>{setMobile(text)}} 
          value={Mobile}
          keyboardType="numeric"
          maxLength={10}
        
          onSubmitEditing={()=>{
           setVerify(true)}}
        
          />
<Button  mode="contained"
disabled={Mobile.length == 10 ?false:true}

onPress={() => {props.navigation.navigate("Otp",{MobileNumber:Mobile})}} loading={Verify}
contentStyle={{justifyContent:"space-around",backgroundColor:Colors.primary}}
dark={false}
>
    {!Verify?"Verify Number":"Sending Otp"}
  </Button>

        
    
          </View>
          

           


        </View>
    )
}

export default MobileLogin

const styles = StyleSheet.create({})
