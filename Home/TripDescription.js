import React,{useState,useEffect,useContext} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity,ScrollView, StatusBar,Linking,Image,ImageBackground,Modal,Pressable} from 'react-native'
import axios from 'react-native-axios'
import url from '../Constants/Database';
import Colors from '../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Headline,Title,Subheading,Paragraph,Caption,List, ActivityIndicator } from 'react-native-paper';
import { SliderBox } from "react-native-image-slider-box";
import FastImage from 'react-native-fast-image';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ScreenLogin from '../Login/ScreenLogin';
import { AppContext } from '../Providers/AppProvider';
const TripDescription = (props) => {

  const userinfo = useContext(AppContext)

    const [expanded, setExpanded] = React.useState(true);

    const [modalVisible, setModalVisible] = useState(false);


    const [current, setcurrent] = React.useState(0);
    
    const [Location, setLocation] = React.useState("");

    
    const [Tripname, setTripname] = React.useState("");

    
    const [OverView, setOverView] = React.useState("");

    
    const [Price, setPrice] = React.useState(0);

    
    const [Duration, setDuration] = React.useState(0);

    
    const [MorePhotos, setMorePhotos] = React.useState([]);

    
    const [Itinerary, setItinerary] = React.useState([]);

    const [Cancelation, setCancelation] = React.useState("");
    
    const [Conditions, setConditions] = React.useState("");

    const [Start, setStart] = React.useState("");

    const [Time, setTime] = React.useState("");

    const [Things, setThings] = React.useState([]);

    const [Data, setData] = React.useState({});

    
    const [Checked, setChecked] = React.useState(false);

    const [Seats, setSeats] = React.useState(0);

    const [Haridwar, setHaridwar] = React.useState([]);
    const [Delhi, setDelhi] = React.useState([]);
    const [Base, setBase] = React.useState([]);
    const [Dehradun, setDehradun] = React.useState([]);

    const handlePress = () => setExpanded(!expanded);


   useEffect(() => {

    axios.post(`${url}/HomePage/TripDescription.php`, {
      id:props.route.params.id
    })
    .then(function (response) {

      console.log(response.data.Luxary)
      setStart(response.data.Departure)
      setTime(response.data.Time)
      setLocation(response.data.Location);
      setDehradun(JSON.parse(response.data.Dehradun))
      setTripname(response.data.Trip_Name);
      setSeats(response.data.Seats)
      setHaridwar(JSON.parse(response.data.Haridwar))
      setDelhi(JSON.parse(response.data.Delhi))
      setBase(JSON.parse(response.data.Base))
      setOverView(response.data.OverView);
      setPrice(response.data.Price);
      setDuration(response.data.Duration);
      setMorePhotos(JSON.parse(response.data.MorePhotos));
      setItinerary(JSON.parse(response.data.Itinerary));
      setThings(JSON.parse(response.data.Things));
      setCancelation(response.data.Cancelation);
      setConditions(response.data.Conditions);

      setChecked(true);
    
      setData(response.data)
    })
    .catch(function (error) {
      console.log(error);
      return(false);
    });
   
   
    return () => {
      setChecked(false);
    }
  
    
   }, [])

 

  
   return (
        <View style={{flex:1}}>

<View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
      
          setModalVisible(!modalVisible);
        }}
      >
      
          <View style={{backgroundColor:"white",
            flex:1,justifyContent:"space-around",borderTopEndRadius:20,
            borderTopStartRadius:20,alignItems:"center",padding:30
          }}>

              <View style={{flexDirection:"row",
            
              alignItems:"center",justifyContent:"space-between",width:"100%"}}>
           
            <Title >Log-in to Book your Trip</Title>
            
            <TouchableOpacity 
            onPress={()=>setModalVisible(!modalVisible)}
            >
            <Icon name="close" size={25} color="red" />
            </TouchableOpacity>
            </View>
            
             <Image source={require("../Assets/Logo.png")}
              style={{width:250,height:250}}
             />

            <View>
           <ScreenLogin {...props} 
           check={()=>{
            setModalVisible(!modalVisible); 
            props.navigation.navigate("Book",{id:props.route.params.id,price:Price,Haridwar:Haridwar,Delhi:Delhi,Base:Base})}}
           />
           </View>
          </View>
       
      </Modal>
      </View>



          {Checked?
            <ScrollView
            stickyHeaderIndices={[4]}
            >
            <TouchableOpacity 
             onPress={()=>props.navigation.goBack()}
            style={{position:"absolute",padding:5,elevation:5,zIndex:20,top:40,right:15,backgroundColor:Colors.RED,borderRadius:20}}>
            <Icon name="close"  size={25} color="white"  />
            </TouchableOpacity>

            <TouchableOpacity 
             onPress={()=>props.navigation.goBack()}
            style={{position:"absolute",paddingHorizontal:10,paddingVertical:5,
            elevation:5,zIndex:20,top:40,left:15,backgroundColor:Colors.Black,borderRadius:20}}>
            <Text style={{color:"white",fontWeight:"bold"}}>Seats Left : {Seats}</Text>
            </TouchableOpacity>
            <StatusBar  translucent={true} backgroundColor="transparent" barStyle="dark-content" /> 

             <View style={{flex:1}}>

             
             <SliderBox
                 ImageComponent={FastImage}
                
                images={MorePhotos.map(item=>{ return item.url})}
                sliderBoxHeight={wp("100%")}
                onCurrentImagePressed={index =>
                 console.log(index)
                }
                circleLoop={true}
                parentWidth={wp("100%")}
                imageLoadingColor={Colors.YELLOW}
                 
                dotStyle={{width: 5,height: 5,}}
               
            />
         
</View>
<View style={{padding:10,backgroundColor:"#f7f7f7",
            flexDirection:"row",justifyContent:"space-between"}}>
              
               <Button 
               dark={false}
               style={{width:"100%",backgroundColor:Colors.YELLOW,marginVertical:20}}
               onPress={()=>{
                 if(userinfo.Loggedin){
                  props.navigation.navigate("Book",{id:props.route.params.id,price:Price,Haridwar:Haridwar,Delhi:Delhi,Base:Base,Dehradun:Dehradun})
                 }
                 else{

                  props.navigation.navigate("Mobile",{id:props.route.params.id,price:Price,Haridwar:Haridwar,Delhi:Delhi,Base:Base,Dehradun:Dehradun})
              
                 }
              
              }}
               mode="contained">Book Now</Button>


            </View>
            
            <View style={{flexDirection:"row",zIndex:0,
            display:userinfo.Admin?"flex":"none"
            ,marginVertical:10,alignItems:"center",justifyContent:"space-around"}}>
                 <Button
                 icon="pencil"
                 mode="contained"
                 style={{backgroundColor:Colors.nAVY_BLUE}}
                 onPress={()=>props.navigation.navigate("FirstStep",{
                  Data:Data
                })}
                 >
                   Edit Trip
                 </Button>

                 <Button
                  style={{backgroundColor:Colors.Green}}
                 icon="calendar"
                  mode="contained"
                  onPress={()=>props.navigation.navigate("EditTrip",{
                    tripid:Data.Id
                   })}
                 >
                   Edit Dates
                 </Button>
               </View>
<View style={{padding:10}}>
<View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
<Title style={{width:"60%"}}>{Tripname}</Title>
<Headline style={{width:"30%",textAlign:"center",color:Colors.GREEN}}>₹ {Price}</Headline>
</View>
</View>


<View style={{padding:10}}>
<View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
<Subheading >Duration : {`${Duration}D/${Duration- 1}N`}</Subheading>
<Subheading >Location : {Location}</Subheading>
</View>
</View>


<View style={{padding:10}}>
<View style={{}}>
<Title>Trip Starting Point</Title>

</View>
</View>

<View style={{padding:10}}>
<View style={{flexDirection:"row",alignItems:"center"}}>
<Icon name="map-marker" color="red" size={25} style={{marginRight:15}} />
<Subheading style={{width:"85%"}}>{Start} @ {Time}</Subheading>
</View>
</View>


<View style={{padding:10}}>
<View style={{}}>
<Title>OverView</Title>
<Paragraph >{OverView}</Paragraph>
</View>
</View>





      <View style={{padding:10}}>
<View style={{}}>
<Title>Tour Itinerary</Title>
</View>
</View>
<View style={{}}>


<ScrollView horizontal={true} 
showsHorizontalScrollIndicator={false}
contentContainerStyle={{paddingStart:15,marginVertical:10}} >

{Itinerary.map((item,index)=>{
  return(
<TouchableOpacity 
key={index}
onPress={()=>setcurrent(index)}
style={{elevation:2,backgroundColor:current == index?Colors.primary:Colors.lIGHT_GREY,paddingHorizontal:20,marginVertical:2,paddingVertical:5,borderRadius:10,marginRight:15}}>
<Text>Day {index}</Text>
</TouchableOpacity>
  )
})}


</ScrollView>

</View>

<View style={{padding:10}}>

<Image source={{uri: Itinerary[current].Image}}

style={{width:"100%",aspectRatio:16/9}}
/>

<Title style={{marginVertical:10}}>
{Itinerary[current].Heading}
</Title>

{Itinerary[current].Highlight.map((item,index)=>{

return(

     <View 
     key={index}
     style={{flexDirection:"row",alignItems:"center",width:'100%',marginBottom:10}}>
     <Icon name="circle" size={10} color="grey" style={{marginRight:10}} />
     <Text>{item}</Text>
       </View>
  


)

})}

</View>

<List.Accordion
        title="Things to Carry"
        titleStyle={{color:"grey"}}
        style={{borderWidth:2,paddingHorizontal:5,borderColor:"#efefef"}}

        expanded={expanded}
        onPress={handlePress}>
            {Things.map((item,index)=>{

return(

  <View 
  key={index}
  style={{flexDirection:"row",alignItems:"center",width:'100%',marginHorizontal:15,marginVertical:10}}>
  <Icon name="circle" size={10} color="grey" style={{marginRight:10}} />
  <Text>{item}</Text>
    </View>





)

})}
    
       
      </List.Accordion>
      <View style={{padding:10}}>
<View style={{}}>
<Title>Cancellation Policy</Title>
<Paragraph >{Cancelation}</Paragraph>
</View>
</View>
<View style={{padding:10}}>
<View style={{}}>
<Title>Terms & Condition</Title>
<Paragraph >{Conditions}</Paragraph>
</View>
</View>

<View style={{padding:10}}>

<Title>Contact Us</Title>
<View style={{flexDirection:"row",marginVertical:15,alignItems:"center",justifyContent:"space-between"}}>
<TouchableOpacity
  onPress={()=>Linking.openURL('https://www.facebook.com/Baaromaas')}
  >
  <Icon 
name="facebook" 
color="#3b5998"
size={30}
/>
  </TouchableOpacity>

  <TouchableOpacity
  onPress={()=>Linking.openURL('https://www.instagram.com/baaromaas_travel/')}
  >
  <Icon 
name="instagram" 
color="#F56040"
size={30}
/>
      </TouchableOpacity>

      <TouchableOpacity
onPress={()=>Linking.openURL(`tel:+91 ${8650646568}`)}
  >
  <Icon 
name="phone" 
color="#F56040"
size={30}
/>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={()=>Linking.openURL('whatsapp://send?text=DoonSeller&phone=+91 8650646568')}
      >
  <Icon 
name="whatsapp" 
color="#075e54"
size={30}
/>
      </TouchableOpacity>
</View>
</View>




             </ScrollView>
:
<>
<StatusBar translucent={true} backgroundColor="transparent" />

<ImageBackground
            source={{uri : props.route.params.imag}} 
            
            resizeMode="cover"
            borderRadius={5}
            style={{height:"100%",Width:"100%",justifyContent:"center"}}>
            <View style={{width:"100%",backgroundColor:"#000000a0",alignItems:"center"}}>
            <Headline style={{color:"white",marginVertical:10}}>Let's Start the Journey</Headline> 
              <ActivityIndicator size="small" color="white" />
              <Caption style={{color:"white",marginVertical:10}} >Please Wait..</Caption> 
            </View>           
          
             
            </ImageBackground>



</>
}
</View>
    )
}

export default TripDescription

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 16,padding:15,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
      },
      centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor:"rgba(0,0,0,0.5)",
        
      
      },
      modalView: {
        width:"100%",
        height:"100%",
        backgroundColor: "white",
        borderTopEndRadius: 20,
        borderTopStartRadius:20,
        
            justifyContent:"space-between",
        
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
   
    
})
