import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,FlatList,ActivityIndicator,ImageBackground,TouchableOpacity,Alert } from 'react-native'
import {Title,Headline} from 'react-native-paper'
import axios from 'react-native-axios'
import url from '../Constants/Database';
import Colors from '../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar, Button, Card, Paragraph ,Subheading} from 'react-native-paper';
const PopularTrips = (props) => {


    const [data,setdata]=useState([]);
    const [DataEnd,setDataEnd]=useState(false);
    const [offset,setoffset]=useState(0);
    
    const [End,setEnd]=useState(true)
    const [refresh,setrefresh]=useState(false)
    const [Update,setUpdate]=useState(false)
    
    const [Checked,setChecked]=useState(false)

    useEffect(() => {
   
        if(End && !DataEnd){
            axios.post(`${url}/HomePage/PopularTrips.php`, {
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

    const onEndReached=()=>{
    
        if(!End ){
           
        setEnd(true)
    
     
        }
    
    }

    const createTwoButtonAlert = (id,index) =>
    Alert.alert(
      "Remove from Popular",
      "Once Removed \nIt will not show in Popular",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => RemoveTrip(id,index) }
      ],
      { cancelable: false }
    );


    const RemoveTrip =(id,index)=>{

        axios.post(`${url}/HomePage/RemovePopular.php`, {
            id:id
           })
           .then(function (response) {
          
             if(response.data)
             {
                data.splice(index, 1);
                setdata([...data]);
             }
           })
           .catch(function (error) {
             console.log(error);
             return(false);
           });

    }


    const renderItem = ({ item ,index}) => {
  
        return(<TouchableOpacity
          onPress={()=>createTwoButtonAlert(item.Id,index)}
        >
           
            <ImageBackground
            source={{uri : item.Image}} 
            resizeMode="cover"
            borderRadius={5}
            style={{aspectRatio:16/9,width:"100%",justifyContent:"center"}}>
              
            </ImageBackground>
           
          
            <View style={{alignSelf:"center",marginVertical:10}}>
            <Text style={{...styles.text}}>{item.Trip_Name.length > 30?`${item.Trip_Name.substring(0, 26)}...`:item.Trip_Name}</Text>
           
             </View>
            </TouchableOpacity>)
      
      }

    return (
        <View style={{flex:1}}>

        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",padding:10,backgroundColor:Colors.Orange}}>
        <TouchableOpacity style={{flexDirection:"row",alignItems:"center"}} onPress={()=>props.navigation.goBack()}>
        <Icon name="arrow-left" color="white" size={25} />
        
        <Title style={{marginLeft:15,color:"white"}}>Categories</Title>
        </TouchableOpacity>

   
        </View> 
         <FlatList
    data={data}
  horizontal={false}
  showsHorizontalScrollIndicator={false}
    renderItem={renderItem}
    inverted={-1}
    keyExtractor={item => item.id}
    contentContainerStyle={{padding:10}}
    ListFooterComponent={()=>{
      return(<View style={{padding:15,display:DataEnd?"none":"flex"}}> 
        <ActivityIndicator size="small" color={Colors.Orange} />
         </View>)}}
  onEndReached={()=>onEndReached()}
   onEndReachedThreshold={0.8}
   onMomentumScrollBegin={() => { setEnd(false) }}
  />



        </View>
    )
}

export default PopularTrips

const styles = StyleSheet.create({})
