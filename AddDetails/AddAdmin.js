import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,ActivityIndicator,FlatList,TouchableOpacity} from 'react-native'
import url from '../database';
import axios from 'react-native-axios'
import Colors from '../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button,TextInput } from 'react-native-paper';

const AddAdmin = () => {

const [admins,setadmins] =useState([]);

const [Mobile,setMobile] =useState("");

    useEffect(() => {
        axios.get(`${url}/HomePage/Admins.php`)
          .then(function (response) {
        
            setadmins(response.data);
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
            return(false);
          });
        return () => {
          
        }
    }, [])


const RemoveAdmin =(val,index)=>{

    axios.post(`${url}/HomePage/RemoveAdmin.php`,{
        Mobile:val
    })
    .then(function (response) {
        admins.splice(index, 1);
        setadmins([...admins]);
      
    })
    .catch(function (error) {
      console.log(error);
      return(false);
    });

}

const AddAdmin =()=>{

    axios.post(`${url}/HomePage/AddAdmin.php`,{
        Mobile:Mobile
    })
    .then(function (response) {
      console.log(response.data)
        setadmins([...admins,Mobile]);
 
        setMobile("");
      
    })
    .catch(function (error) {
      console.log(error);
      return(false);
    });

}
    
    const renderItem = ({ item ,index}) => {
  
        return(<View key={index} style={{flexDirection:"row",alignItems:'center',justifyContent:"space-between"}}>
        <View style={{borderWidth:1,
          borderColor:"silver",flex:1,marginBottom:15,padding:15,borderRadius:10,backgroundColor:"white"}}>
        <Text style={{color:"black"}}>{item}</Text>
        
        </View>
        <TouchableOpacity 
     
        onPress={()=>{
            RemoveAdmin(item,index)
        }}
        
        style={{marginLeft:10,alignSelf:"center",display:admins.length > 1?"flex":"none"}} activeOpacity={0.9}>
        
        <Icon name="trash-can" size={30} color={"#FE5F55"} style={{alignSelf:"center"}} />
        </TouchableOpacity>
        </View>)
      
      }
    return (
        <View style={{flex:1}}>
            {admins.length == 0?
           <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
           <ActivityIndicator size="large" color={Colors.Black} />
             </View>
       
           :<>
           <FlatList
           data={admins}
         contentContainerStyle={{padding:10}}
           renderItem={renderItem}
           keyExtractor={(item,index) => index}
         
       
         />
         <View style={{padding:10,borderTopWidth:2,borderColor:Colors.SILVER,backgroundColor:"white"}}>
         <TextInput
mode="outlined"
label="Add New Admin"
maxLength={10}
keyboardType="number-pad"
onChangeText={(text)=>{setMobile(text)}}
placeholder="Admin Mobile Number" 
style={{backgroundColor:"white",marginBottom:10}}
value={Mobile}


      
onSubmitEditing={()=>{
  if(Mobile != ""){
    AddAdmin()
  }
}}
blurOnSubmit={false}
/>



<Button 
icon="plus"
onPress={() => 
  {
    if(Mobile != ""){
        AddAdmin()
      }
  }}
  dark={false}
style={{backgroundColor:"#B8D8D8"}}
mode="contained" >
    Add
  </Button>
  </View>
         </>
          }
        
        </View>
    )
}

export default AddAdmin

const styles = StyleSheet.create({})
