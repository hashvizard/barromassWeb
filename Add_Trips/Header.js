import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Header = (props) => {
    return (
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",paddingHorizontal:5}}>

<TouchableOpacity

onPress={()=>props.navigation.goBack()}
>
            <Icon name="arrow-left" size={30} color="white" />
 
            </TouchableOpacity>
            <Text style={{color:"white",fontSize:21,fontWeight:"bold",paddingLeft:15}}>{props.text}</Text>


        </View>
    )
}

export default Header

const styles = StyleSheet.create({})
