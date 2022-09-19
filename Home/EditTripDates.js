import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList,TextInput,StatusBar } from 'react-native'
import url from '../database'
import Colors from '../Constants/Colors'
import { Button } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const EditTripDates = (props) => {
   
    const [TripDates,setTripDates]=useState([])
    const [tripid]=useState(props.route.params.tripid)

    useEffect(() => {
       
        const abortController=new AbortController()
        const signal=abortController.signal
    
      
        fetch(`${url}/HomePage/EditTrip.php`, 
        {signal:signal,
        
               method: 'POST',
         headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         },
         body: JSON.stringify({
         
        
          tripid:props.route.params.tripid,
      
       
               })
             
             })
             .then((response) =>response.json())
         .then((responseJson) => {
   
      
        
       
              setTripDates(responseJson);
              
             
          })
         
         // Showing response message coming from server after inserting records.
             .catch((error) => {
               console.error(error);
             });
       
      
         return function cleanup () {
       abortController.abort()
      }
    
        }, [])

 
  const renderItem =({item})=>{
    return(
   
        <TouchableOpacity
        
        onPress={()=>{props.navigation.navigate("DateSave",{name:item.date,date:item.date,
            available:item.Availableseats,
            left:item.Totalseats,tripid:tripid})}}


        style={{padding:10,borderWidth:2,borderColor:Colors.secondry,flexDirection:"row",justifyContent:'space-between',alignItems:"center"}}>

     <Text>{item.date}</Text>
     <Text>{item.Availableseats}</Text>
     <Text>{item.Totalseats}</Text>

        </TouchableOpacity>
        )
  }

    return (<>
     <StatusBar backgroundColor={Colors.ORANGE} translucent={false} />  
    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",
padding:10,backgroundColor:Colors.primary}}>
        <TouchableOpacity
        
        onPress={()=>props.navigation.goBack()}
        style={{flexDirection:"row",alignItems:"center"}}>
        <Icon name="arrow-left" size={25} color="white" />
              <Text style={{marginLeft:15}}>Go Back</Text>
        </TouchableOpacity>

        <Button 
        style={{backgroundColor:Colors.GREEN}}
        onPress={()=>props.navigation.navigate("AddDates",{title:"Add Dates",tripid:props.route.params.tripid})}
        mode="contained">
            Add Dates
        </Button>
    </View>
        <ScrollView style={{flex:1}}
 
        >

<View



style={{backgroundColor:Colors.primary,padding:10,flexDirection:"row",justifyContent:'space-between',alignItems:"center",marginBottom:10}}>

<Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>Dates</Text>
<Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>Available Seats</Text>
<Text style={{fontSize:16,fontWeight:"bold",color:"white"}}>Total Seats</Text>

</View>


<FlatList
        data={TripDates}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />






          
        </ScrollView>
        </>
    )
}

export default EditTripDates

const styles = StyleSheet.create({})
