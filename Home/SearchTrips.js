import React,{useState,useContext} from 'react'
import { View,Text,FlatList,RefreshControl, ActivityIndicator, Keyboard,StatusBar,TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../Constants/Colors';
import { Avatar, Button, Card, Title, Paragraph,Searchbar } from 'react-native-paper';
import axios from 'react-native-axios'
import url from '../Constants/Database';
import { useFocusEffect } from '@react-navigation/native';



const SearchTrips = (props) => {
    
 
    const [searchQuery, setSearchQuery] = useState('');

   const [data,setdata]=useState([])
    const [DataEnd, setDataEnd] = useState(false);
    const [offset, setoffset] = useState(0);

    const [End, setEnd] = useState(true)
    const [refresh, setrefresh] = useState(false)
    const [Update, setUpdate] = useState(false)

    const [Checked, setChecked] = useState(false)
 
      useFocusEffect(
        React.useCallback(() => {
          if(End && !DataEnd){
            axios.post(`${url}/HomePage/SearchTrips.php`, {
              offset:offset,
              search:searchQuery
            })
            .then(function (response) {
      
       
      
              if(response.data.length == 0 || response.data.length < 5 )
              {
                setDataEnd(true); 
              }
              else{
                setoffset(offset+5);
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
    
  

   
        
    const onChangeSearch = () => {
  
      setrefresh(true);
      setoffset(0)
      setdata([]);
      setDataEnd(false)
      setEnd(true)
      setChecked(false)
      setUpdate(!Update)
   
      Keyboard.dismiss()
    };
    
      const renderItem = ({ item ,index}) => {


    return ( <Card style={{margin:5}} mode="elevated">
<Card.Actions style={{alignSelf:"flex-end",justifyContent:"space-between",width:"100%"}}>
  <Button color={Colors.Red} >{item.Category}</Button>
 
  <Button color={Colors.YELLOW}>{`${item.Duration}D/${item.Duration - 1}N`}</Button>
  <Button color={Colors.GREEN} >₹ {item.Price}</Button>
</Card.Actions>
<TouchableOpacity
         onPress={()=>props.navigation.navigate("Tripdescription",{id:item.Id,imag:item.Image})}
         >
    <Card.Cover source={{ uri: item.Image }} />
</TouchableOpacity>
<Card.Content style={{marginTop:15}}>
  <Title>{item.Trip_Name}</Title>
  <Paragraph>{item.OverView.length > 90?`${item.OverView.substring(0, 90)}...`:item.OverView}</Paragraph>
</Card.Content>


</Card>
    )
        }

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
        return (
            <View style={{flex:1}}>
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                   <View style={{backgroundColor:"white"}}>
          <Searchbar
      placeholder="Search Trip Name or Location"
      autoFocus={true}
      icon={() => <Icon onPress={()=>props.navigation.goBack()} name="arrow-left" size={30}/>}
      onChangeText={(text)=>{setSearchQuery(text);text.length < 1?onChangeSearch():null}}
      onSubmitEditing={()=>onChangeSearch()}
      value={searchQuery}
     />
        </View>
         
            {Checked && data.length == 0?
           
           <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
          
         <Text style={{fontSize:18,fontFamily:'Poppins-Medium'}}>All Trips Booked</Text>
         <Text style={{fontSize:12}}>Look for Another Trips</Text>
           </View>
            :!Checked && data.length == 0?
            <View style={{flex:1,justifyContent:'center',alignItems:"center"}}>
            <ActivityIndicator size="large" color={"black"} />
            <Text style={{marginTop:40,fontFamily:"Poppins-Regular"}}>Looking for Trips</Text>
              </View>
        
            :
         
            <FlatList
            data={data}
         showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl
           colors={["#9Bd35A", "#689F38"]}
           refreshing={refresh}
           
           onRefresh={()=>{Refreshing()}} />}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          
            ListFooterComponent={()=>{
              return(<View style={{padding:15,display:DataEnd?"none":"flex"}}> 
                <ActivityIndicator size="small" color="black" />
                 </View>)}}
          onEndReached={()=>onEndReached()}
           onEndReachedThreshold={0.5}
           onMomentumScrollBegin={() => { setEnd(false) }}
          />

         
           }
    
         
            </View>
          );
}

export default SearchTrips

