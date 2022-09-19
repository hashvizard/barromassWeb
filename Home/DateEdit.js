import React,{useState,useContext} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity,TextInput,StatusBar} from 'react-native'
import Colors from '../Constants/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import url from '../database';
import {AppContext} from '../Providers/AppProvider'
const DateEdit = (props) => {

  const UserInfo=useContext(AppContext);
const [available,setAvailable]=useState(0)

const [left,setleft]=useState(0)

/**
 * Update Dates
 */

const UpdateData =()=>{

    fetch(`${url}/HomePage/UpdateDates.php`, 
    {
    
           method: 'POST',
     headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     },
     body: JSON.stringify({
     
      tripid:props.route.params.tripid,
      date:props.route.params.name,
      available:available,
      Total:left
   
   
           })
         
         })
         .then((response) => response.text())
     .then((responseJson) => {
  
       if(responseJson == "Success"){
         props.navigation.goBack();
       }
   
     })
     
     // Showing response message coming from server after inserting records.
         .catch((error) => {
           console.error(error);
         });
  
  

}  


/**
 * Delete Dates
 */


const DeleteData =()=>{

    fetch(`${url}/HomePage/DeleteDates.php`, 
    {
    
           method: 'POST',
     headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     },
     body: JSON.stringify({
   
      tripid:props.route.params.tripid,
      date:props.route.params.name,
      available:available,
      Total:left
   
   
           })
         
         })
         .then((response) => response.text())
     .then((responseJson) => {
  
    
       if(responseJson == "Success"){
         props.navigation.goBack();
       }
   
     })
     
     // Showing response message coming from server after inserting records.
         .catch((error) => {
           console.error(error);
         });
  
  

}  


    return (<>

<View style={{elevation:2,backgroundColor:Colors.primary,padding:15,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
         <StatusBar backgroundColor={Colors.ORANGE} translucent={false} />  
           <TouchableOpacity 
           
           onPress={()=>{
             props.navigation.goBack()
           }}
           
           style={{flexDirection:"row",alignItems:"center"}}>
             <Icon name="arrow-left" size={22} color="white" />
             <Text style={{fontSize:20,paddingLeft:15,color:"white"}}>{props.route.params.name}</Text>
             </TouchableOpacity>
            
            {/**
             * This is for Delete
             */}

             <TouchableOpacity
             
             onPress={()=>{DeleteData()}}
             style={{padding:10,
             display:props.route.params.available == props.route.params.left?'flex':'none',
             borderRadius:10,backgroundColor:Colors.error,elevation:2}} >
                  <Text style={{color:"white"}}>Delete</Text>
             </TouchableOpacity>


             <TouchableOpacity
             
             onPress={()=>{UpdateData()}}
             style={{padding:10,borderRadius:10,backgroundColor:Colors.nAVY_BLUE,elevation:2}} >
                  <Text style={{color:"white"}}>Save Changes</Text>
             </TouchableOpacity>

            
          </View> 
     

{/**
 * This is for Available Seats
 */}

<View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:10,marginTop:10}}>

<View style={{width:160}}>
<Text style={{paddingHorizontal:10,fontSize:16,fontFamily:"Poppins-Bold"}}>Available Seats :</Text>
</View>

<TextInput 
style={{borderWidth:2,borderRadius:10,flex:1,paddingStart:15,borderColor:"lightgrey"}}
onChangeText={text=>{setAvailable(text)}}
value={available}
keyboardType="numeric"
placeholder={props.route.params.available} />

</View>

      {/**
 * This is for Total Seats
 */}
  
        
<View style={{flexDirection:"row",alignItems:"center",paddingHorizontal:10,marginTop:10}}>

<View style={{width:160}}>
<Text style={{paddingHorizontal:10,fontSize:16,fontFamily:"Poppins-Bold"}}>Total Seats :</Text>
</View>

<TextInput 
style={{borderWidth:2,borderRadius:10,flex:1,paddingStart:15,borderColor:"lightgrey"}}
onChangeText={text=>{setleft(text)}}
value={left}
keyboardType="numeric"
placeholder={props.route.params.left} />

</View>     
        
        </>
    )
}

export default DateEdit

const styles = StyleSheet.create({})
