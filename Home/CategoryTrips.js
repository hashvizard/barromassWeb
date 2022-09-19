import React,{useState} from 'react'
import { View,Text,FlatList,TouchableOpacity ,RefreshControl, ActivityIndicator,Alert,Image,Dimensions,StyleSheet} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'react-native-axios'
import url from '../Constants/Database';
import Colors from '../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
const CategoryTrips = (props) => {

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
        axios.post(`${url}/HomePage/CategoryTrips.php`, {
          category:props.route.params.category,
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
       <Card.Actions style={{alignSelf:"flex-end",justifyContent:"space-between",width:"100%"}}>
          <Button color={Colors.Red} >{item.Category}</Button>
         
          <Button color={Colors.YELLOW}>{`${item.Duration}D/${item.Duration - 1}N`}</Button>
          <Button color={Colors.Green} >₹ {item.Price}</Button>
        </Card.Actions>
      <TouchableOpacity
         onPress={()=>props.navigation.navigate("Tripdescription",{id:item.Id,imag:item.Image})}
         >
            <Card.Cover source={{ uri: item.Image }}  />
            </TouchableOpacity>
        <Card.Content style={{marginTop:15}}>
          <Title>{item.Trip_Name}</Title>
          <Paragraph>{item.OverView.length > 90?`${item.OverView.substring(0, 90)}...`:item.OverView}</Paragraph>
        </Card.Content>
    
       
      </Card>)
  
  }

    return (
        <View style={{flex:1}}>
       
        {Checked && data.length == 0?
          
          <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
        <Text style={{fontSize:20,fontWeight:'bold'}}>All Trips Booked</Text>
        <Text style={{fontSize:16}}>Look for another Location</Text>
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

export default CategoryTrips

const styles = StyleSheet.create({})
