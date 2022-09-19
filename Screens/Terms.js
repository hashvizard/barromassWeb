import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,StatusBar, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native'
import Colors from '../Constants/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'react-native-axios'
import url from '../Constants/Database';
import { Paragraph ,Title} from 'react-native-paper';
const Terms = (props) => {


const [heading]=useState(["Payment",
"Id's",
"Booking Transfer",
"In Case of any loss",
"Departure Time",
"Air Conditioning",
"In case you Miss Trip",
"Smoking & Alcohol",
"Behaviour",
"Natural Hazards",
"Burglary",
"Climate Change",
]) 

const [data,setdata]=useState({})

const [update,setupdate]=useState(true)

useEffect(() => {

    if(update){

       
    axios.get(`${url}/Policy.php`)
      .then(function (response) {
    
        setdata(response.data);
    setupdate(false) 
    })
      .catch(function (error) {
        console.log(error);
        return(false);
      });
    }
}, [])




    return (
        <View style={{flex:1,backgroundColor:Colors.primary}}>
        <StatusBar backgroundColor={Colors.ORANGE} />
        <View style={{padding:15,backgroundColor:Colors.primary,
            justifyContent:'space-between',flexDirection:"row",alignItems:"center"}}>
        
         <TouchableOpacity
          style={{flexDirection:'row',alignItems:"center"}} 
          onPress={()=>props.navigation.openDrawer()}>
         <Icon name="menu" color="white" size={30} />
         <View>
            <View style={{flexDirection:"row"}}> 
         <Text style={{color:"white",fontSize:21,paddingLeft:15,fontWeight:"bold",alignItems:"center",justifyContent:"center"}}
         >Terms & Condition</Text>
         
         </View>
      
         </View>
         
         </TouchableOpacity>

       
       
        </View>
        <View style={{flex:1,backgroundColor:Colors.White}}>

{Object.keys(data).length === 0 && data.constructor === Object?
<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>

<ActivityIndicator size="large" color="black" />
</View>

:<ScrollView contentContainerStyle={{padding:15}}>



{Object.keys(data).map(function(key, index) {
if(index +1 <= 12)
{    return(
        <View style={{marginBottom:15}} key={index}>
            <Title>{heading[index]}</Title>
            <Paragraph>{data[key]}</Paragraph>
        </View>
    )
}

})}

</ScrollView>
}


    </View>
        </View>
    )
}

export default Terms

const styles = StyleSheet.create({})
