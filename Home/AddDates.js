import React,{useState,useContext} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity,ScrollView,TextInput} from 'react-native'
import Colors from '../Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Calendar} from 'react-native-calendars';
import url from '../database';

const AddDates = (props) => {
   
    const [dates,setdates]=useState([])
    const [dateon,setdateon]=useState(false);
    const [finaldates,setfinaldates]=useState([])
   


   const selectDate=(day)=> {
    let selectedDate = day.dateString;
    let newDates = dates;

    let data=finaldates;

    if (dates[selectedDate]) {
     
      delete data[selectedDate]

      delete newDates[selectedDate]

    } else {
      
      newDates[selectedDate]={selected: true, marked: true, selectedColor: Colors.YELLOW};
             
    }
    setdates({...newDates})
  }


  
/**
 * Update Dates
 */

const UpdateData =()=>{


  
   fetch(`${url}/HomePage/AddTripsDates.php`, 
   {
   
          method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    
     tripid:props.route.params.tripid,
     date:finaldates,
   
  
  
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

    return (
        <>
        <View style={{elevation:2,backgroundColor:Colors.primary,padding:15,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
           
           <TouchableOpacity 
           
           onPress={()=>{
             props.navigation.goBack()
           }}
           
           style={{flexDirection:"row",alignItems:"center"}}>
             <Icon name="arrow-left" size={22} color="white" />
             <Text style={{fontSize:20,paddingLeft:15,color:"white"}}>Add Dates</Text>
             </TouchableOpacity>
            
            {/**
             * This is for Delete
             */}

           


             <TouchableOpacity
             
             onPress={()=>{UpdateData()}}
             style={{padding:10,borderRadius:10,backgroundColor:Colors.nAVY_BLUE,elevation:2}} >
                  <Text style={{color:"white"}}>Save Changes</Text>
             </TouchableOpacity>

            
          </View> 
     
          <ScrollView style={{flex:1}}>

          {dateon?

<Calendar
  // Collection of dates that have to be colored in a special way. Default = {}
  minDate={()=>new Date().getDate()}
  

  // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'

  enableSwipeMonths={true}
  markingType={'custom'}

  onDayPress={(day) =>selectDate(day)}
  markedDates={dates} 

  

/>
:null


}



            <View

style={{borderWidth:2,flexDirection:"row",
    padding:10,justifyContent:"space-around",alignItems:"center",
    borderRadius:10,borderColor:Colors.lIGHT_GREY,marginBottom:10,backgroundColor:"white"}}>



<TouchableOpacity 
style={{display:dateon?"flex":"none"}}
onPress={()=>{setdateon(false);setdates({})}}
>
<Icon name="close-circle" size={30}  color="red"/>
</TouchableOpacity>
<TouchableOpacity 
style={{display:dateon?"flex":"none"}}
onPress={()=>{setdateon(false);


}} >
<Icon name="check-circle" size={30}  color="green"/>
</TouchableOpacity>

<TouchableOpacity 

onPress={()=>setdateon(true)}
style={{elevation:2,
display:dateon?"none":"flex",width:"100%",alignItems:"center",
padding:10,borderRadius:10,backgroundColor:Colors.GREEN}}>

<Text style={{color:"white"}}>Add Dates</Text>

</TouchableOpacity>

</View>
     
{Object.entries(dates).map(([key, value]) =>{

return(<View style={{borderWidth:2,borderColor:Colors.SILVER,borderRadius:10,padding:0,alignItems:"center",marginBottom:10,flexDirection:"row",justifyContent:'space-between'}}>

<Text style={{fontFamily:"Poppins-Bold",paddingLeft:10}}>{key}</Text>

<View style={{alignItems:"center",marginRight:10,flexDirection:"row"}}>

<TextInput placeholder="Enter Total Seats"
keyboardType="numeric"
onChangeText={text=>{

  let found = finaldates.find(element => element.date === key);

if(found == undefined){
  setfinaldates([...finaldates,{date:key,seats:text}])
}
else{

finaldates.map((item)=>{
  if(item.date == key){
    item.seats=text
  }
})
setfinaldates([...finaldates])
}
}}

style={{textAlign:"center"}}/>


  </View>

</View>
)
  


})
}
     
     
     
              </ScrollView>

        </>
    )
}

export default AddDates

const styles = StyleSheet.create({})
