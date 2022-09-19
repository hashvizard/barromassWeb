import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View ,TouchableOpacity,ScrollView, StatusBar,Linking,Image,ImageBackground} from 'react-native'
import axios from 'react-native-axios'
import url from '../Constants/Database';
import Colors from '../Constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Headline,Title,Subheading,Paragraph,Caption,List, ActivityIndicator } from 'react-native-paper';
import { SliderBox } from "react-native-image-slider-box";
import FastImage from 'react-native-fast-image';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const TripDetails = (props) => {
    const [expanded, setExpanded] = React.useState(true);

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

    const [Checked, setChecked] = React.useState(false);


    const [cancel,setcancel]=useState(false)

    const handlePress = () => setExpanded(!expanded);


   useEffect(() => {

    axios.post(`${url}/HomePage/TripDescription.php`, {
      id:props.route.params.id
    })
    .then(function (response) {
      setStart(response.data.Departure)
      setTime(response.data.Time)
      setLocation(response.data.Location);
      
      setTripname(response.data.Trip_Name);

      setOverView(response.data.OverView);
      setPrice(response.data.Price);
      setDuration(response.data.Duration);
      setMorePhotos(JSON.parse(response.data.MorePhotos));
      setItinerary(JSON.parse(response.data.Itinerary));
      setThings(JSON.parse(response.data.Things));
      setCancelation(response.data.Cancelation);
      setConditions(response.data.Conditions);

      setChecked(true);
     
     
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
          {Checked?
            <ScrollView
            stickyHeaderIndices={[1]}
            >
            <TouchableOpacity 
             onPress={()=>props.navigation.goBack()}
            style={{position:"absolute",padding:5,elevation:5,zIndex:20,top:40,right:15,backgroundColor:Colors.RED,borderRadius:20}}>
            <Icon name="close"  size={25} color="white"  />
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

<View style={{padding:10}}>
<View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
<Title style={{width:"60%"}}>{Tripname}</Title>
<Headline style={{width:"30%",textAlign:"center",color:"green"}}>₹ {Price}</Headline>
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

     <View style={{flexDirection:"row",alignItems:"center",width:'100%',marginBottom:10}}>
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


<View style={{padding:10}}>
<View style={{}}>
<Title>Terms & Condition</Title>
<Paragraph >{Conditions}</Paragraph>
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

export default TripDetails

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 16,padding:15,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
      }
})
