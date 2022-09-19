import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity,StatusBar } from 'react-native'

import Colors from '../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Button, Card, Title, Paragraph ,Subheading,List} from 'react-native-paper';
const FirstPage = (props) => {
    return (
        <View style={{flex:1}}>
        <StatusBar backgroundColor={Colors.ORANGE} />
        <View style={{flexDirection:"row",alignItems:"center",padding:10,backgroundColor:Colors.Orange}}>
        <TouchableOpacity onPress={()=>props.navigation.openDrawer()}>
        <Icon name="menu" color="white" size={25} />
        </TouchableOpacity>
        <Title style={{marginLeft:15,color:"white"}}>Add Thing's</Title>
        </View>  
        <View style={{flex:1,justifyContent:'space-around'}}>
  
        <List.Item
        onPress={()=>props.navigation.navigate("Banners")}
    title="Posters"
    description="Add Banners to Baaromaas"
    left={props => <List.Icon {...props} icon="image" />}
  />
        <List.Item
        onPress={()=>props.navigation.navigate("Categories")}
    title="Categories"
    description="Add Categories to Baaromaas"
    left={props => <List.Icon {...props} icon="multiplication-box" />}
  />
    <List.Item

onPress={()=>props.navigation.navigate("PopularTrips")}
    title="Popular Trips"
    description="Change Popular Trips"
    left={props => <List.Icon {...props} icon="star" />}
  />
    <List.Item

onPress={()=>props.navigation.navigate("Locations")}

    title="Locations"
    description="Add or Remove Locations"
    left={props => <List.Icon {...props} icon="map-marker" />}
  />
    <List.Item

onPress={()=>props.navigation.navigate("AddTrips")}

    title="Add Trips"
    description="Add trips to Baaromaas"
    left={props => <List.Icon {...props} icon="hiking" />}
  />

<List.Item

onPress={()=>props.navigation.navigate("AddAdmin")}

    title="Baaromaas Admins"
    description="Add or Remove Admins"
    left={props => <List.Icon {...props} icon="account-key" />}
  />
</View>
        </View>
    )
}

export default FirstPage

const styles = StyleSheet.create({})
