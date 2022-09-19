import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,ScrollView,FlatList,ImageBackground,TouchableOpacity,ActivityIndicator } from 'react-native'
import {Title,Headline} from 'react-native-paper'
import axios from 'react-native-axios'
import url from '../Constants/Database';
import Colors from '../Constants/Colors';
import LottieView from 'lottie-react-native';


const Banner = (props) => {

const [location,setlocation]=useState([]);


    useEffect(() => {

        axios.get(`${url}/HomePage/Banners.php`)
          .then(function (response) {
          
            let data=response.data;
            data.reverse(); 
          setlocation(data)

          })
          .catch(function (error) {
            console.log(error);
            return(false);
          });
        
        
        
    }, [])

    const renderItem = ({ item ,index}) => {
  
      
         
           return(
          <TouchableOpacity
          onPress={()=>props.navigation.navigate("Location",{location:item.location})}
          >
           <ImageBackground
            source={{uri : item.Vendor}} 
            resizeMode="cover"
          
            style={{aspectRatio:16/9,width:350,borderWidth:2,overflow:"hidden",borderRadius:10,
            borderColor:"white"
                ,marginTop:10,marginRight:15,justifyContent:"flex-end"}} />
            
            </TouchableOpacity>
          
           )
         
         }

    return (
       <>
        
        

         {location.length == 0?
         <View style={{height:150,width:"100%"}}>
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

export default Banner

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 16,
       
        textAlign: "center",
        backgroundColor: "#000000a0",
     
      }
})
