import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,FlatList,ActivityIndicator,ImageBackground,TouchableOpacity } from 'react-native'
import {Title,Headline,Chip} from 'react-native-paper'
import axios from 'react-native-axios'
import url from '../Constants/Database';
import Colors from '../Constants/Colors';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Popular = (props) => {


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
              let dataw=[...data,...response.data];
              dataw.reverse(); 
              setdata(dataw)

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
    const renderItem = ({ item ,index}) => {
  
        return(<TouchableOpacity
          onPress={()=>props.navigation.navigate("Tripdescription",{id:item.Id,imag:item.Image})}
        >
           
            <ImageBackground
            source={{uri : item.Image}} 
            resizeMode="cover"
            borderRadius={5}
            style={{height:150,aspectRatio:16/9,marginRight:10,justifyContent:"center"}}>
              
            </ImageBackground>
           
            <View style={{backgroundColor:"white",borderTopWidth:4,borderColor:"#f7f7f7", width:"97%",bottom:0,
            borderBottomEndRadius:5,borderBottomStartRadius:5,padding:4,
            position:"absolute"}}>
           <Text style={{color:"black",paddingStart:10,textAlign:"center"}}>{item.Trip_Name.length > 28?`${item.Trip_Name.substring(0, 25)}...`:item.Trip_Name}</Text>
           
             </View>
            </TouchableOpacity>)
      
      }

    return (
        <View style={{}}>
         <View style={{flexDirection:"row",padding:15,marginVertical:10}}>
        <Chip  
       
        selectedColor="black"
        
        textStyle={{color:'black'}}
        icon={()=>{
            return(
            <Icon name="star" color="#FDCC0D" size={20} />
            )
        }}
         >Popular Trek's</Chip>
        </View>
         {data.length == 0?
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

         <FlatList
    data={data}
  horizontal={true}
  showsHorizontalScrollIndicator={false}
    renderItem={renderItem}
    keyExtractor={item => item.id}
    contentContainerStyle={{paddingStart:15}}
    ListFooterComponent={()=>{
      return(<View style={{padding:15,display:DataEnd?"none":"flex"}}> 
        <ActivityIndicator size="small" color={Colors.Orange} />
         </View>)}}
  onEndReached={()=>onEndReached()}
   onEndReachedThreshold={0.8}
   onMomentumScrollBegin={() => { setEnd(false) }}
  />


    }
          <View style={{flexDirection:"row",padding:15,marginVertical:10}}>
        <Chip  
    
        selectedColor="black"
        
        textStyle={{color:'black'}}
        icon={()=>{
            return(
            <Icon name="hiking" color="#5cb85c" size={20} />
            )
        }}
         >Adventure's</Chip>
        </View>
        </View>
    )
}

export default Popular

const styles = StyleSheet.create({})
