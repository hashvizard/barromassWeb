import React,{useState,useContext} from 'react'
import { View,Text,FlatList,TouchableOpacity ,RefreshControl,ScrollView, ActivityIndicator,Alert,Image,Dimensions,StyleSheet, StatusBar} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'react-native-axios'
import url from '../Constants/Database';
import Colors from '../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Button, Card, Title, Paragraph,Caption } from 'react-native-paper';
import { AppContext } from '../Providers/AppProvider';

const FirstPage = (props) => {

    const userinfo = useContext(AppContext)
    const [data,setdata]=useState([]);
const [DataEnd,setDataEnd]=useState(false);
const [offset,setoffset]=useState(0);

const [End,setEnd]=useState(true)
const [refresh,setrefresh]=useState(false)
const [Update,setUpdate]=useState(false)

const [Checked,setChecked]=useState(false)



useFocusEffect(
    React.useCallback(() => {
      if(End && !DataEnd){
        axios.post(`${url}/HomePage/MyBookings.php`, {
          userid:userinfo.userid,
          offset:offset
        })
        .then(function (response) {
      
          if(response.data.length == 0 || response.data.length < 10 )
          {
            setDataEnd(true); 
          }
          else{
            setoffset(offset+10);
          }
          setdata([...data,...response.data]);
          setChecked(true)
          setrefresh(false)
        })
        .catch(function (error) {
          console.log(error);
          return(false);
        });
      
      }
    }, [End,Update])
  );
  
  const onEndReached=()=>{
    
    if(!End ){
       
    setEnd(true)

 
    }

}

const Refreshing=()=>{
 
    setrefresh(true);
    setoffset(0)
    setdata([]);
    setDataEnd(false)
    setEnd(true)
    setChecked(false)
    setUpdate(!Update)
  
   
  
}

const renderItem = ({ item ,index}) => {
  
    return(<Card style={{margin:5}} mode="elevated">
    
      <TouchableOpacity
         onPress={()=>props.navigation.navigate("TripDetails",{id:item.Id,imag:item.Image})}
         >
            <Card.Cover source={{ uri: item.Image }} />

            </TouchableOpacity>

            <Card.Content>
          <Title style={{marginTop:10}}>{item.Trip_Name}</Title>
          <View style={{flexDirection:"row",alignItems:"center"}}>
        {item.Status == "Active"?
          <Caption>Meeting Point : {item.Point == "Haridwar"?"Haridwar Railway Station":item.Point == "Base"?"At Base Location":item.Departure} @ {item.Time}</Caption>
        :
        <Caption>Refund Has Been Initiated and will be transfered to your Bank Account within 7 Working Days.</Caption>
         } 
 </View>
        </Card.Content>
          
            <ScrollView horizontal={true} 
showsHorizontalScrollIndicator={false}
contentContainerStyle={{paddingStart:15,marginVertical:10}} >


<View 

style={{elevation:2,backgroundColor:"white",borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
<Text>Status : {item.Status == "Active"?"Booked":"Canceled"}</Text>
</View>

<View 

style={{elevation:2,backgroundColor:"white",borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
<Text>Travel Date : {item.traveling}</Text>
</View>

<View 

style={{elevation:2,backgroundColor:"white",borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
<Text>{item.persons} Persons</Text>
</View>

<View 

style={{elevation:2,backgroundColor:"white",borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
<Text>Sharing : {item.Sharing}</Text>
</View>


<View 

style={{elevation:2,backgroundColor:"white",borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
<Text>Departure From : {item.Point}</Text>
</View>

<View 

style={{elevation:2,
display:item.BookingAmount == 0?"none":"flex",
backgroundColor:"white",borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
<Text>Paid Amount :  ₹ {item.BookingAmount}</Text>
</View>

<View 

style={{elevation:2,backgroundColor:"white",borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
<Text>{item.BookingAmount == 0?"Full Payment":"Remaing Amount"} : ₹ {item.FullAmount}</Text>
</View>


 </ScrollView>
       
       
       
     
    
        
      </Card>)
  
  }

    return (
        <View style={{flex:1}}>
         <StatusBar backgroundColor={Colors.ORANGE}  />
         <View style={{flexDirection:"row",alignItems:"center",padding:10,backgroundColor:Colors.primary}}>
         <TouchableOpacity onPress={()=>props.navigation.openDrawer()}>
         <Icon name="menu" color="white" size={25} />
         </TouchableOpacity>
         <Title style={{marginLeft:15,color:"white"}}>My Booking's</Title>
         </View>    
   

        {Checked && data.length == 0?
          
          <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>No Booking Yets</Text>
        <Text style={{fontSize:16}}>Book Your Trip and start the Journey</Text>
          </View>
           :!Checked && data.length == 0?
           <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
           <ActivityIndicator size="large" color={Colors.Black} />
             </View>
       
           :<FlatList
           data={data}
          refreshControl={<RefreshControl
          colors={["#9Bd35A", "#689F38"]}
          refreshing={refresh}
          onRefresh={()=>{Refreshing()}} />}
           renderItem={renderItem}
           keyExtractor={item => item.id}
           ListFooterComponent={()=>{
             return(<View style={{padding:15,display:DataEnd?"none":"flex"}}> 
               <ActivityIndicator size="small" color={Colors.Orange} />
                </View>)}}
         onEndReached={()=>onEndReached()}
          onEndReachedThreshold={1}
          onMomentumScrollBegin={() => { setEnd(false) }}
         />
          }
             
        <View style={{position:'absolute',zIndex:50,bottom:20,right:20}}>
       
       
    
       
       
       </View>
               </View>
    )
}

export default FirstPage

const styles = StyleSheet.create({})
