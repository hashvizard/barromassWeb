import React from 'react'
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'

const ListItem = (props) => {

  return (<TouchableOpacity 
  onPress={()=>props.navigation.navigate("Category",{category:props.data.item.Name})}
  style={{width:"43%",marginBottom:15}}>
     
     <Image
            source={{uri : props.data.item.Photo}} 
            resizeMode="cover"
            borderRadius={10}
            style={{width:"100%",aspectRatio:1/1,borderRadius:10}}
            
           />
          <View style={{position:"absolute",borderTopWidth:2,borderColor:"#f7f7f7",
          bottom:0,padding:5,borderBottomEndRadius:10,borderBottomStartRadius:10
          ,backgroundColor:"white",width:"100%"}}>
          <Text style={{color:"black"}}>{props.data.item.Name}</Text>
          </View>
       </TouchableOpacity>
 
   
  )
}

export default ListItem

const styles = StyleSheet.create({})
