import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,StatusBar, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native'
import Colors from '../Constants/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Paragraph ,Title} from 'react-native-paper';
const Cancelation = (props) => {




const [data,setdata]=useState({})





    return (
        <View style={{flex:1,backgroundColor:Colors.primary}}>
        <StatusBar backgroundColor={Colors.ORANGE} />
        <View style={{padding:15,backgroundColor:Colors.primary,
            justifyContent:'space-between',flexDirection:"row",alignItems:"center"}}>
        
         <TouchableOpacity
          style={{flexDirection:'row',alignItems:"center"}} 
          onPress={()=>props.navigation.openDrawer()}>
         <Icon name="menu" color="white" size={30} />
         <View>
            <View style={{flexDirection:"row"}}> 
         <Text style={{color:"white",fontSize:21,paddingLeft:15,fontWeight:"bold",alignItems:"center",justifyContent:"center"}}
         >Cancellation Policy</Text>
         
         </View>
      
         </View>
         
         </TouchableOpacity>

       
       
        </View>
        <View style={{flex:1,backgroundColor:Colors.White}}>
<ScrollView contentContainerStyle={{padding:15}}>




        <View style={{marginBottom:15}} >
            <Title>How to Cancel the Trip ?</Title>
            <Paragraph>To Cancel a trip, User need to Contact Us over Whatsapp or Mail and our team will cancel the trip from our side.</Paragraph>
        </View>
        <View style={{marginBottom:15}} >
            <Title>Refund Procedure ?</Title>
            <Paragraph style={{marginBottom:10}}>Cancellation up to 30 Days: 90% of Trek/adventure program cost will be refunded.</Paragraph>
            <Paragraph style={{marginBottom:10}}>Between 21 – 30 Days: 60% of Trek/adventure program cost will be refunded.</Paragraph>
            <Paragraph style={{marginBottom:10}}>Between 20 – 11 Days: 30% of Trek/adventure program cost will be refunded.</Paragraph>
            <Paragraph style={{marginBottom:10}}>Less than 10 Days: No refund.</Paragraph>
        </View>

</ScrollView>



    </View>
        </View>
    )
}

export default Cancelation

const styles = StyleSheet.create({})
