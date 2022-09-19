import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,FlatList,Image,Alert } from 'react-native'
import Colors from '../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'react-native-axios'
import url from '../Constants/Database';
import storage from '@react-native-firebase/storage';
import { Avatar, Button, Card, Title, Paragraph ,Subheading} from 'react-native-paper';

const Locations = (props) => {

    const [data,setdata] =useState([]);

    useFocusEffect(
        React.useCallback(() => {
            axios.get(`${url}/HomePage/LocationTrips.php`)
            .then(function (response) {
             
              setdata(response.data)
      
            })
            .catch(function (error) {
              console.log(error);
              return(false);
            });
          
        }, [])
      );
  

      const createTwoButtonAlert = (index,img,catego) =>
      Alert.alert(
        "Remove Location",
        "By Clicking on Ok this Location will be removed from list",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => RemoveImage(index,img,catego) }
        ]
      );

      
const RemoveImage=(index,img,catego)=>{

  let imageRefa = storage().refFromURL(img);
  imageRefa
    .delete()
    .then(() => {
      
  
      console.log(`has been deleted successfully.`);
    })
    .catch((e) => console.log('error on image deletion => ', e));

   RemoveDatabse(index,catego)

  
}

const RemoveDatabse=(index,catego)=>{
 

  axios.post(`${url}/HomePage/Removecatandloc.php`,{
    type:"Location",
    Name:catego
  })
  .then(function (response) {
   
    if(response.data){

    
    data.splice(index, 1);
    
    setdata([...data])
    }
  })
  .catch(function (error) {
    console.log(error);
    return(false);
  });
   


}
  const renderItem = ({item,index}) => {


      return  (<TouchableOpacity 
        onPress={()=>createTwoButtonAlert(index,item.Vendor,item.Image)}
      style={{width:"40%",marginBottom:15}}>
         
         <Image
                source={{uri : item.Vendor}} 
                resizeMode="cover"
                borderRadius={5}
                style={{width:150,height:100,borderRadius:10}}
                
               />
              
              <Text style={{margin:10}}>{item.Image}</Text>
    
           </TouchableOpacity>
     
       
      )
    }

    return (
        <View style={{flex:1}}>

        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:10,backgroundColor:Colors.Orange}}>
        <TouchableOpacity style={{flexDirection:"row",alignItems:"center"}} onPress={()=>props.navigation.goBack()}>
        <Icon name="arrow-left" color="white" size={25} />
        
        <Title style={{marginLeft:15,color:"white"}}>Locations</Title>
        </TouchableOpacity>

        <Button
        style={{backgroundColor:Colors.Green}}
        onPress={()=>props.navigation.navigate("AddLocations")}
        mode="contained">Add</Button>
         
        </View> 
<View style={{flex:1}}>
        <FlatList
       data={data}
      numColumns={2}
      contentContainerStyle={{paddingTop:30}}
       columnWrapperStyle={{justifyContent:"space-evenly"}}
      
       renderItem={renderItem}
       keyExtractor={(item, index) => `list-item-${index}`}
     />
</View>
        </View>
    )
}

export default Locations

const styles = StyleSheet.create({})
