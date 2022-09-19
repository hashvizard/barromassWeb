import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Text, View,StatusBar, TouchableOpacity,Linking} from 'react-native'
import Colors from '../Constants/Colors'
import { Divider } from 'react-native-paper';

const Contact = (props) => {
    return (
        <View style={{flex:1,backgroundColor:Colors.Black}}>
        <StatusBar backgroundColor={Colors.ORANGE} />
        <View style={{padding:15,backgroundColor:Colors.Orange,
            justifyContent:'space-between',flexDirection:"row",alignItems:"center"}}>
        


         <TouchableOpacity
          style={{flexDirection:'row',alignItems:"center"}} 
          onPress={()=>props.navigation.openDrawer()}>
         <Icon name="menu" color="white" size={30} />
         <View>
            <View style={{flexDirection:"row"}}> 
         <Text style={{color:"white",fontSize:21,paddingLeft:15,fontWeight:"bold",alignItems:"center",justifyContent:"center"}}
         >Contact Us</Text>
         
         </View>
      
         </View>
         
         </TouchableOpacity>

       
       
        </View>
        <View style={{flex:1,backgroundColor:Colors.White,padding:20
,justifyContent:'space-around'}}>

<View>
<Text style={{fontSize:16,fontWeight:"bold"}}>Click on any of these to connect</Text>
<Text>You will be Directly Redirect to that App</Text>
</View>

<View style={{borderWidth:1,borderColor:Colors.Orange}} />

<TouchableOpacity

onPress={()=>Linking.openURL('https://www.facebook.com/Baaromaas')}
style={{flexDirection:"row",alignItems:'center',flexWrap:"wrap"}}>

    <Icon name="facebook" size={35} color={Colors.nAVY_BLUE} />

    <Text style={{paddingLeft:15,fontSize:16}}>Connect with us on FaceBook</Text>

</TouchableOpacity>

<Divider style={{alignSelf:"flex-end",width:"70%"}} />

<TouchableOpacity


onPress={()=>Linking.openURL('https://www.instagram.com/baaromaas_travel/')}

style={{flexDirection:"row",alignItems:'center',flexWrap:"wrap"}}>

    <Icon name="instagram" size={35} color={Colors.Orange} />
    
    <Text style={{paddingLeft:15,fontSize:16}}>Connect with us on Instagram</Text>
</TouchableOpacity>



<Divider style={{alignSelf:"flex-end",width:"70%"}} />


<TouchableOpacity

onPress={()=>Linking.openURL('mailto:info@baaromaastravel.com')}

style={{flexDirection:"row",alignItems:'center',flexWrap:"wrap"}}>

    <Icon name="gmail" size={35} color={Colors.RED} />
    <Text style={{paddingLeft:15,fontSize:16}}>Connect with us on Mail</Text>
</TouchableOpacity>



<Divider style={{alignSelf:"flex-end",width:"70%"}} />


<TouchableOpacity

onPress={()=>Linking.openURL('whatsapp://send?text=DoonSeller&phone=+91 8650646568')}

style={{flexDirection:"row",alignItems:'center',flexWrap:"wrap"}}>

    <Icon name="whatsapp" size={35} color={Colors.Green} />
    <Text style={{paddingLeft:15,fontSize:16}}>Whatsapp us your Queries.</Text>
</TouchableOpacity>


<Divider style={{alignSelf:"flex-end",width:"70%"}} />


<TouchableOpacity

onPress={()=>Linking.openURL(`tel:+91 ${8650646568}`)}

style={{flexDirection:"row",alignItems:'center',flexWrap:"wrap"}}>

    <Icon name="phone" size={35} color={Colors.Black} />
    <Text style={{paddingLeft:15,fontSize:16}}>We are Available on Call 24*7 </Text>
</TouchableOpacity>



</View>
        </View>
    )
}

export default Contact

const styles = StyleSheet.create({})
