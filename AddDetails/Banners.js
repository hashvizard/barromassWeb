import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity,FlatList,Image,Alert } from 'react-native'
import Colors from '../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'react-native-axios'
import url from '../Constants/Database';
import storage from '@react-native-firebase/storage';
import { Avatar, Button, Card, Title, Paragraph ,Subheading} from 'react-native-paper';

const Banners = (props) => {

    const [data,setdata] =useState([]);

    useFocusEffect(
        React.useCallback(() => {
            axios.get(`${url}/HomePage/Banners.php`)
            .then(function (response) {
             
              setdata(response.data)
      
            })
            .catch(function (error) {
              console.log(error);
              return(false);
            });
          
        }, [])
      );
  

      const createTwoButtonAlert = (index,img,id) =>
      Alert.alert(
        "Remove Banner",
        "By Clicking on Ok this Banner will be removed from list",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => RemoveImage(index,img,id) }
        ]
      );

      
const RemoveImage=(index,img,id)=>{

  let imageRefa = storage().refFromURL(img);
  imageRefa
    .delete()
    .then(() => {
      
      
      console.log(`has been deleted successfully.`);
    })
    .catch((e) => {
       
        console.log('error on image deletion => ', e)});

        RemoveDatabse(index,id)

  
}

const RemoveDatabse=(index,id)=>{
 

  axios.post(`${url}/HomePage/Removecatandloc.php`,{
    type:"Banner",
    Name:id
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
        onPress={()=>createTwoButtonAlert(index,item.Vendor,item.Id)}
      style={{width:"98%",marginBottom:15,alignSelf:"center"}}>
         
         <Image
                source={{uri : item.Vendor}} 
                resizeMode="cover"
               
                style={{width:"100%",aspectRatio:16/9,borderRadius:5}}
                
               />
              
            
    
           </TouchableOpacity>
     
       
      )
    }

    return (
        <View style={{flex:1}}>

        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:10,backgroundColor:Colors.Orange}}>
        <TouchableOpacity style={{flexDirection:"row",alignItems:"center"}} onPress={()=>props.navigation.goBack()}>
        <Icon name="arrow-left" color="white" size={25} />
        
        <Title style={{marginLeft:15,color:"white"}}>Banners</Title>
        </TouchableOpacity>

        <Button
        style={{backgroundColor:Colors.Green}}
        onPress={()=>props.navigation.navigate("AddBanners")}
        mode="contained">Add</Button>
         
        </View> 
<View style={{flex:1}}>
        <FlatList
       data={data}
      inverted={-1}
      contentContainerStyle={{paddingBottom:10}}
       
      
       renderItem={renderItem}
       keyExtractor={(item, index) => `list-item-${index}`}
     />
</View>
        </View>
    )
}

export default Banners

const styles = StyleSheet.create({})
