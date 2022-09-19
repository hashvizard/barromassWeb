import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,ScrollView,FlatList,ImageBackground,TouchableOpacity,ActivityIndicator } from 'react-native'
import {Title,Headline,Chip} from 'react-native-paper'
import axios from 'react-native-axios'
import url from '../Constants/Database';
import Colors from '../Constants/Colors';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Location = (props) => {

const [location,setlocation]=useState([]);


    useEffect(() => {

        axios.get(`${url}/HomePage/LocationTrips.php`)
          .then(function (response) {
           
          setlocation(response.data)

          })
          .catch(function (error) {
            console.log(error);
            return(false);
          });
        
        
        
    }, [])

    const renderItem = ({ item ,index}) => {
  
      
         
           return(
           <TouchableOpacity
           onPress={()=>props.navigation.navigate("Location",{location:item.Image})}
           >
           <ImageBackground
            source={{uri : item.Vendor}} 
            
            resizeMode="cover"
            borderRadius={5}
            style={{height:120,minWidth:200,marginRight:15,justifyContent:"flex-end"}}>
            <Text style={styles.text}>{item.Image}</Text>  
            </ImageBackground>
            </TouchableOpacity>
           )
         
         }

    return (
       <>
        
        <View style={{flexDirection:"row",padding:15,marginVertical:10}}>
        <Chip  
     
        selectedColor="black"
        
        textStyle={{color:'black'}}
        icon={()=>{
            return(
            <Icon name="map-marker" color="#d9534f" size={20} />
            )
        }}
         >Our Top Location's</Chip>
        </View>
         {location.length == 0?
         <View style={{height:100,width:"100%"}}>
   <LottieView
   source={require('../Animations/LoadTrips.json')}
   colorFilters={[{
     keypath: "button",
     color: "black"
   },{
     keypath: "Sending Loader",
     color: "#F00000"
   }]}
  autoPlay={true}
  loop={true}
  resizeMode="cover"
 style={{flex:1}}
 />
 </View>
     :

        <View style={{width:"100%"}}>
         <FlatList
    data={location}
 horizontal={true}
 contentContainerStyle={{paddingStart:15}}
 showsHorizontalScrollIndicator={false}
    renderItem={renderItem}
    keyExtractor={item => item.id}
 
  />
  </View>
}
  </>
       
    )
}

export default Location

const styles = StyleSheet.create({
    text: {
        color: "black",
        fontSize: 16,padding:5,
       borderTopWidth:2,borderColor:"#f7f7f7",
        textAlign: "center",
        backgroundColor: "white",
     
      }
})
