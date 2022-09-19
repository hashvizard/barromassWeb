import React, { useState,useContext,useRef,useEffect } from 'react'
import { ScrollView, StyleSheet,StatusBar, Text,TouchableOpacity,View,Image,Modal,Alert,Platform, ActivityIndicator } from 'react-native'
import AddPhoto from './AddPhoto';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Colors';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import {Calendar} from 'react-native-calendars';
import { widthPercentageToDP } from 'react-native-responsive-screen';

import Header from './Header';
import url from '../database';
import storage from '@react-native-firebase/storage';
import { Button,TextInput,Caption ,Title} from 'react-native-paper';
import { AddTripContext } from '../Providers/AddTripProvider';
const FirstStep = (props) => {

  const Trip = useContext(AddTripContext)

const [dates,setdates]=useState([])

const [upload,setUpload]=useState(false);   
const [dateon,setdateon]=useState(false);
const [wait,setwait]=useState(false);
const [location,setlocation]=useState([]);
const [Cat,setCat]=useState([]);

//Data to Send on Server

const [finaldates,setfinaldates]=useState([])
const [imagePath,setimagepath]=useState("");
const [Name,setName]=useState("");
const [Duration,setDuration]=useState(0);
const [chooseLocation,setchooseLocation]=useState("");
const [Starting,setStarting]=useState("");
const [Overview,setOverview]=useState("");


const [Price,setPrice]=useState(0);
const [Photos,setPhotos]=useState([]);

const [Time,setTime]=useState([]);
const [Popular,setPopular]=useState("");
const [Category,setCategory]=useState([]);



const [seats,setseats]=useState(0);


const [Haridwar,setHaridwar]=useState([0,0,0]);
const [Delhi,setDelhi]=useState([0,0,0]);
const [Base,setBase]=useState([0,0,0]);
const [Dehradun,setDehradun]=useState([0,0,0]);
const [Luxary,setLuxary]=useState("");
//checking Variables

const [loading,setloading]=useState(false)

const [loading2,setloading2]=useState(false)

useEffect(() => {
  
let Data=props.route.params.Data;

setimagepath(Data.Image);
setName(Data.Trip_Name);
setDuration(Data.Duration);
setchooseLocation(Data.Location);
setStarting(Data.Departure);
setOverview(Data.OverView);
setPrice(Data.Price)
setPhotos(JSON.parse(Data.MorePhotos))
setTime(Data.Time)
setPopular(Data.Popular)
setLuxary(Data.Luxary)

setseats(Data.Seats)

setHaridwar(JSON.parse(Data.Haridwar))
setDelhi(JSON.parse(Data.Delhi))
setBase(JSON.parse(Data.Base))
setDehradun(JSON.parse(Data.Dehradun))
setCategory(JSON.parse(Data.Category))


Trip.setItenaery(JSON.parse(Data.Itinerary))


}, [])



useEffect(() => {
 
  const abortController=new AbortController()
  const signal=abortController.signal


  fetch(`${url}/HomePage/GetTripData.php`, 
  {signal:signal,
  
         method: 'POST',
   headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
   },
   body: JSON.stringify({

    Type:"Trips"
           
         })
       
       })
       .then((response) => response.json())
   .then((responseJson) => {
    setCat(responseJson[0]);
    setlocation(responseJson[1])

   })
   
   // Showing response message coming from server after inserting records.
       .catch((error) => {
         console.error(error);
       });
 
  
   return function cleanup () {
 abortController.abort()
}

}, [])


const UpdateDatabase =async ()=>{


  await fetch(`${url}/HomePage/UpdateTrip.php`, 
  {method: 'POST',
   headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    id:props.route.params.Data.Id,
    image:imagePath,
    Name:Name,
    Duration:parseInt(Duration),
    location:chooseLocation,
    Starting:Starting,
    Overview:Overview,
    Price:parseInt(Price),
    Photos:JSON.stringify(Photos),
    Time:Time,
    Popular:Popular,
    Luxary:Luxary,
    Category:JSON.stringify(Category),
    Itenary:JSON.stringify(Trip.Itenary),
    seats:parseInt(seats),
    Haridwar:JSON.stringify(Haridwar),
    Delhi:JSON.stringify(Delhi),
    Base:JSON.stringify(Base),
    Dehradun:JSON.stringify(Dehradun),
           
         })
       
       })
       .then((response) => response.json())
   .then((responseJson) => {
     if(responseJson){

    props.navigation.goBack()
     }
  })
   
   // Showing response message coming from server after inserting records.
       .catch((error) => {
         console.error(error);
       });
}



const DeleteDatabases =async (val)=>{

  setloading2(true)


  await fetch(`${url}/HomePage/DeleteTrip.php`, 
  {method: 'POST',
   headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    id:props.route.params.Data.Id,
  
         })
       
       })
       .then((response) => response.json())
   .then((responseJson) => {
     if(responseJson){
      setloading2(false)
    props.navigation.navigate("FirstPage")
     }
  })
   
   // Showing response message coming from server after inserting records.
       .catch((error) => {
         console.error(error);
       });
     
}



const createTwoButtonAlert = (val) =>
Alert.alert(
  "Remove Image",
  "Are you sure you want to remove this Image",
  [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "Yes", onPress: () => RemoveImage(val)}
  ],
  { cancelable: false }
);

const checkcategory =(val)=>{

  
  let mu=Category.find((item, index) => {
       if (item == val) {
        
           return true; // stop searching
       }
   });
 
 if(mu){return true}
 else{return false}

  
}

const RemoveImage=(val)=>{

  let imageRefa = storage().refFromURL(Photos[val].url);
  imageRefa
    .delete()
    .then(() => {
      
    Photos.splice(val, 1);

    setPhotos([...Photos])
      console.log(`has been deleted successfully.`);
    })
    .catch((e) => console.log('error on image deletion => ', e));



}

const getFileName=(name, path)=> {
  if (name != null) { return name; }

  if (Platform.OS === "ios") {
      path = "~" + path.substring(path.indexOf("/Documents"));
  }
  return path.split("/").pop();
}

const getPlatformPath =({ path, uri }) => {
  return Platform.select({
      android: { "value": path },
      ios: { "value": uri }
  })
}


    
      const Pickers =() =>{
        ImagePicker.openPicker({
            width: 600,
            aspectRatio:16/9,
            includeBase64:true,
            compressImageQuality:1,
            forceJpg:true, 
            cropperActiveWidgetColor:Colors.primary,
                cropperToolbarColor:Colors.primary,
                cropperToolbarWidgetColor:Colors.wHITE,
               
                cropperToolbarTitle:"Crop Image",
               
                avoidEmptySpaceAroundImage:true,
                cropperStatusBarColor:Colors.primary,
              cropping:true
          }).then(response => {
    
            let path = getPlatformPath(response).value;
            let fileName = getFileName(response.fileName, path);
          
            uploadImageToStorage(path, fileName);
    
        
        
        });
        
        
        }
    
        const uploadImageToStorage =(path, name) =>{
   
  
          setwait(true)
          
           let reference = storage().ref(name);
     
           let task = reference.putFile(path);
          
        
          
           task.then(() => {
               
               storage()
               .ref('/' + name) //name in storage in firebase console
               .getDownloadURL()
               .then((URL) => {
     
                 if(imagePath != ""){
               let imageRefa = storage().refFromURL(imagePath);
     
                 imageRefa
                 .delete()
                 .then(() => {
                   console.log(`has been deleted successfully.`);
                 })
                 .catch((e) => 
               
                 
                 console.log('error on image deletion => ', e));
               }
                 setimagepath(URL)
                 setUpload(false);
                 setwait(false)
               })
             })
           }




    /**
    |--------------------------------------------------
    | Multiple Date Selection
    |--------------------------------------------------
    */



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
    |--------------------------------------------------
    | Multiple Date Selection end
    |--------------------------------------------------
    */


    return (
      <>
<StatusBar backgroundColor={Colors.ORANGE} translucent={false} />
<View style={{padding:15,backgroundColor:Colors.primary}}>
 <Header {...props} text={"Edit Trip"}/>
</View>
        <View style={{paddingHorizontal:'4%',flex:1}}>

<ScrollView showsVerticalScrollIndicator={false}>         

{/**
|--------------------------------------------------
| This is For IMage Uplaod
|--------------------------------------------------
*/}
<View style={{display:dateon?"none":'flex'}}>

{upload && !wait?

<View style={styles.imageContainer}> 

<View style={{height:"100%",width:"100%",borderRadius:10,backgroundColor:Colors.SEMI_TRANSPARENT,position:"absolute",zIndex:10}}>

<View style={{width:"100%",alignItems:'flex-end',padding:"4%"}}>

<TouchableOpacity onPress={()=>setUpload(false)}>
<Icon name="close" size={35} color={Colors.error} />
</TouchableOpacity>


</View>


<View style={{flex:1,justifyContent:"space-evenly",alignItems:"center"}}>


<TouchableOpacity 

onPress={()=>Pickers()}

style={{elevation:2,paddingHorizontal:20,paddingVertical:10,borderRadius:10,backgroundColor:Colors.YELLOW}}>
<Text style={{color:"black"}}>Upload From Gallery</Text>
</TouchableOpacity>





</View>
</View>
</View>

:upload && wait?
<View style={styles.imageContainer}> 

<View style={{height:"100%",width:"100%",borderRadius:10,backgroundColor:Colors.SEMI_TRANSPARENT,position:"absolute",zIndex:10}}>




<View style={{flex:1,justifyContent:"space-evenly",alignItems:"center"}}>


<View 



>
<ActivityIndicator size="large" color="white" />
</View>





</View>
</View>
</View>



:imagePath != ""?


<TouchableOpacity

onPress={()=>setUpload(true)}

style={styles.imageContainer}>                        
   <Image  source={{uri : imagePath  }}

style={{width:"100%",height:"100%",resizeMode:"cover",borderRadius:10}}

/>
  </TouchableOpacity>




:
<TouchableOpacity

onPress={()=>setUpload(true)}

style={styles.imageContainer}>                        
<Icon name="image-plus" size={55} color={Colors.App_back} />
<Text>Add Trip Profile</Text>
  </TouchableOpacity>
}             
</View>

<View style={{display:dateon?"flex":'none'}}>

<View style={styles.datecontainer}> 

<Calendar
  // Collection of dates that have to be colored in a special way. Default = {}
  minDate={()=>new Date().getDate()}
  

  // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'

  enableSwipeMonths={true}
  markingType={'custom'}

  onDayPress={(day) =>selectDate(day)}
  markedDates={dates} 

  

/>
</View>

    </View>

{/**
|--------------------------------------------------
| This is For Date
|--------------------------------------------------
*/}






{/**
|--------------------------------------------------
| This is For Dates/seats
|--------------------------------------------------
*/}

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





<TextInput
value={Name}
mode="outlined"
placeholder="Trip Name"
onChangeText={(text)=>setName(text)}
style={{marginBottom:10}}
/>




<TextInput
value={Duration}
mode="outlined"
placeholder="Trip Duration"
keyboardType="number-pad"
onChangeText={(text)=>setDuration(text)}
style={{marginBottom:10}}
/>


<TextInput
value={Starting}
mode="outlined"
placeholder="Trip Starting Address"
multiline={true}
onChangeText={(text)=>setStarting(text)}
style={{marginBottom:10}}
/>




<TextInput
value={Time}
mode="outlined"
placeholder="Trip Starting Time"

onChangeText={(text)=>setTime(text)}
style={{marginBottom:10}}
/>





<TextInput
value={seats}
mode="outlined"
placeholder="Trip Display Seats"
keyboardType="number-pad"
onChangeText={(text)=>setseats(text)}
style={{marginBottom:10}}
/>


<TextInput
value={Price}
mode="outlined"
placeholder="Trip Display Price"
keyboardType="number-pad"
onChangeText={(text)=>setPrice(text)}
style={{marginBottom:10}}
/>



<TextInput
value={Overview}
mode="outlined"
placeholder="Trip Overview"
multiline={true}
onChangeText={(text)=>setOverview(text)}
style={{marginBottom:10}}
/>




<View style={{flex:1,marginBottom:10}}>


    <View style={{marginBottom:10}}>
<Caption style={{textAlign:"center"}}>Add Photos to Trips</Caption>
</View>

    <View style={{alignItems:"center",marginBottom:15}}>
<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

{Photos.map((item,index)=>{

return(

<TouchableOpacity 

onLongPress={()=>{
    createTwoButtonAlert(index)
}}

style={{width:200,alignItems:"center",justifyContent:'center',overflow:"hidden",
aspectRatio:1/1,borderWidth:2,borderColor:"lightgrey",borderRadius:10,marginRight:15}}>

<Image source={{uri: item.url}} style={{width:"100%",height:"100%",resizeMode:"cover"}} />
</TouchableOpacity>

)})}



<AddPhoto URl={(val)=>{setPhotos([...Photos,{url:val}])}} />

</ScrollView>
</View>


<View style={{marginBottom:10}}>
<Caption style={{}}>Add Itinerary to Trips</Caption>
</View>


{Trip.Itenary.length > 0?

Trip.Itenary.map((item,index)=>{

return(
<View key={index} style={{flexDirection:"row",alignItems:'center',justifyContent:"space-between"}}>
<TouchableOpacity 

onPress={()=>{
  props.navigation.navigate("Itenary",{category:index,edit:true})
}}

style={{borderWidth:1,
  borderColor:"silver",flex:1,marginBottom:15,padding:15,borderRadius:10,backgroundColor:"white"}}>
<Text style={{color:"black"}}>Day {index}</Text>

</TouchableOpacity>
<TouchableOpacity 

onPress={()=>{
  Trip.Itenary.splice(index, 1);

  Trip.setItenaery([...Trip.Itenary]);
}}

style={{marginLeft:10,alignSelf:"center"}} activeOpacity={0.9}>

<Icon name="close-circle" size={30} color={"#FE5F55"} />
</TouchableOpacity>
</View>
)

})

:
null
}


<Button 
icon="plus"
onPress={() => {

  props.navigation.navigate("Itenary",{category:Trip.Itenary.length,edit:false})

}}
  dark={false}
style={{marginBottom:10,backgroundColor:"#B8D8D8"}}
mode="contained" >
    Add Day {Trip.Itenary.length}
  </Button>



  <View style={{marginBottom:10}}>
<Caption style={{}}>Choose Category</Caption>
</View>



<ScrollView horizontal={true} 
showsHorizontalScrollIndicator={false}
contentContainerStyle={{marginBottom:30,marginTop:10}} >

{Cat.map((item,index)=>{
  return(
<TouchableOpacity 
key={index}
onPress={() =>{
  if(checkcategory(item)){
      Category.splice(Category.indexOf(Category.find(data => data === item)),1);
      setCategory([...Category])

  }else{
    Category.push(item);
      setCategory([...Category])
  }
}}


style={{elevation:2,backgroundColor:checkcategory(item)?Colors.gREEN_COLL:Colors.lIGHT_GREY,paddingHorizontal:20,marginVertical:2,paddingVertical:5,borderRadius:10,marginRight:15}}>
<Text>{item}</Text>
</TouchableOpacity>
  )
})}


</ScrollView>
  

  </View>
<View style={{marginBottom:10}}>
<Caption style={{}}>Choose Locations</Caption>
</View>

<Picker
style={{width:"100%",height:50,marginBottom:15}}
mode="dialog"
itemStyle={{color:"lightgrey"}}
  selectedValue={chooseLocation}
  onValueChange={(itemValue, itemIndex) =>
    setchooseLocation(itemValue)
  }>
  {location.map((item)=>{
      return(
<Picker.Item label={item} value={item}  />
      )
  })
  }
</Picker>




<View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",
   marginBottom:15}}>

    <TouchableOpacity 
    activeOpacity={0.9}
    onPress={()=>setPopular("yes")}
    
    style={{alignItems:'center',width:"40%",padding:10,backgroundColor:Popular == "yes" ?Colors.primary:"lightgrey",borderRadius:8}}>
    <Text>Popular</Text>  
    </TouchableOpacity>
    <TouchableOpacity 
    onPress={()=>setPopular("no")}
    activeOpacity={0.9}
    style={{alignItems:"center",width:"40%",padding:10,backgroundColor:Popular == "no" ?Colors.primary:"lightgrey",borderRadius:8}}>
    <Text>Not Popular</Text>  
  </TouchableOpacity>
  
    </View> 

    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",
   marginBottom:15}}>

    <TouchableOpacity 
    activeOpacity={0.9}
    onPress={()=>setLuxary("yes")}
    
    style={{alignItems:'center',width:"40%",padding:10,backgroundColor:Luxary == "yes" ?Colors.primary:"lightgrey",borderRadius:8}}>
    <Text>Luxurious Trek</Text>  
    </TouchableOpacity>
    <TouchableOpacity 
    onPress={()=>setLuxary("no")}
    activeOpacity={0.9}
    style={{alignItems:"center",width:"40%",padding:10,backgroundColor:Luxary == "no" ?Colors.primary:"lightgrey",borderRadius:8}}>
    <Text>Affordable Trek</Text>  
  </TouchableOpacity>
  
    </View> 

    <Title>Haridwar - Haridwar</Title>

<View style={{marginBottom:10}}>
<View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
<Text style={{marginLeft:5}}>Double Sharing</Text>

<TextInput
value={Haridwar[0]}
style={{minWidth:"45%",textAlign:"center"}}
mode="outlined"
placeholder="Price"
keyboardType="number-pad"
onChangeText={(text)=>{
 let arr = [...Haridwar];
  arr[0] = text;
  setHaridwar(arr);
  console.log(Haridwar)
}}

/>
</View>

<View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
<Text style={{marginLeft:5}}>Triple Sharing</Text>

<TextInput
value={Haridwar[1]}
style={{minWidth:"45%",textAlign:"center"}}
mode="outlined"
placeholder="Price"
keyboardType="number-pad"
onChangeText={(text)=>{
  let arr = [...Haridwar];
   arr[1] = text;
   setHaridwar(arr);
   console.log(Haridwar)
 }}

/>
</View>
<View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
<Text style={{marginLeft:5}}>Quad Sharing</Text>

<TextInput
value={Haridwar[2]}
style={{minWidth:"45%",textAlign:"center"}}
mode="outlined"
placeholder="Price"
keyboardType="number-pad"
onChangeText={(text)=>{
  let arr = [...Haridwar];
   arr[2] = text;
   setHaridwar(arr);
   console.log(Haridwar)
 }}

/>
</View>

</View>



<Title>Delhi - Delhi</Title>

<View style={{marginBottom:10}}>
<View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
<Text style={{marginLeft:5}}>Double Sharing</Text>

<TextInput
value={Delhi[0]}
style={{minWidth:"45%",textAlign:"center"}}
mode="outlined"
placeholder="Price"
keyboardType="number-pad"
onChangeText={(text)=>{
 let arr = [...Delhi];
  arr[0] = text;
  setDelhi(arr);
  console.log(Delhi)
}}

/>
</View>

<View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
<Text style={{marginLeft:5}}>Triple Sharing</Text>

<TextInput
value={Delhi[1]}
style={{minWidth:"45%",textAlign:"center"}}
mode="outlined"
placeholder="Price"
keyboardType="number-pad"
onChangeText={(text)=>{
  let arr = [...Delhi];
   arr[1] = text;
   setDelhi(arr);
   console.log(Delhi)
 }}

/>
</View>
<View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
<Text style={{marginLeft:5}}>Quad Sharing</Text>

<TextInput
value={Delhi[2]}
style={{minWidth:"45%",textAlign:"center"}}
mode="outlined"
placeholder="Price"
keyboardType="number-pad"
onChangeText={(text)=>{
  let arr = [...Delhi];
   arr[2] = text;
   setDelhi(arr);
   console.log(Delhi)
 }}

/>
</View>

</View>


<Title>Base - Base</Title>

<View style={{marginBottom:10}}>
<View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
<Text style={{marginLeft:5}}>Double Sharing</Text>

<TextInput
value={Base[0]}
style={{minWidth:"45%",textAlign:"center"}}
mode="outlined"
placeholder="Price"
keyboardType="number-pad"
onChangeText={(text)=>{
 let arr = [...Base];
  arr[0] = text;
  setBase(arr);
  console.log(Base)
}}

/>
</View>

<View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
<Text style={{marginLeft:5}}>Triple Sharing</Text>

<TextInput
value={Base[1]}
style={{minWidth:"45%",textAlign:"center"}}
mode="outlined"
placeholder="Price"
keyboardType="number-pad"
onChangeText={(text)=>{
  let arr = [...Base];
   arr[1] = text;
   setBase(arr);
   console.log(Base)
 }}

/>
</View>
<View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
<Text style={{marginLeft:5}}>Quad Sharing</Text>

<TextInput
value={Base[2]}
style={{minWidth:"45%",textAlign:"center"}}
mode="outlined"
placeholder="Price"
keyboardType="number-pad"
onChangeText={(text)=>{
  let arr = [...Base];
   arr[2] = text;
   setBase(arr);
   console.log(Base)
 }}

/>
</View>

</View>


<Title>Dehradun - Dehradun</Title>

<View style={{marginBottom:10}}>
<View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
<Text style={{marginLeft:5}}>Double Sharing</Text>

<TextInput
value={Dehradun[0]}
style={{minWidth:"45%",textAlign:"center"}}
mode="outlined"
placeholder="Price"
keyboardType="number-pad"
onChangeText={(text)=>{
 let arr = [...Dehradun];
  arr[0] = text;
  setDehradun(arr);
  console.log(Base)
}}

/>
</View>

<View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
<Text style={{marginLeft:5}}>Triple Sharing</Text>

<TextInput
value={Dehradun[1]}
style={{minWidth:"45%",textAlign:"center"}}
mode="outlined"
placeholder="Price"
keyboardType="number-pad"
onChangeText={(text)=>{
  let arr = [...Dehradun];
   arr[1] = text;
   setDehradun(arr);
   console.log(Base)
 }}

/>
</View>
<View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
<Text style={{marginLeft:5}}>Quad Sharing</Text>

<TextInput
value={Dehradun[2]}
style={{minWidth:"45%",textAlign:"center"}}
mode="outlined"
placeholder="Price"
keyboardType="number-pad"
onChangeText={(text)=>{
  let arr = [...Dehradun];
   arr[2] = text;
   setDehradun(arr);
   console.log(Base)
 }}

/>
</View>
</View>

    <Button 
loading={loading}

onPress={() => {

UpdateDatabase();

}}
  dark={false}
style={{marginVertical:20,backgroundColor:Colors.primary}}
mode="contained" >
    {loading?"Please Wait..":"Update Trip"}
  </Button>

  <Button 
loading={loading2}

onPress={() => {

DeleteDatabases("first");

}}
  dark={true}
style={{marginBottom:20,backgroundColor:Colors.red}}
mode="contained" >
    {loading2?"Please Wait..":"Delete this Trip"}
  </Button>
</ScrollView>
        
        </View>
        </>
    )
}

export default FirstStep

const styles = StyleSheet.create({
    imageContainer:{
        marginVertical:10,borderRadius:10,aspectRatio:16/9,alignSelf:"center",
        width:"100%",borderWidth:2,borderColor:Colors.SILVER,justifyContent:'center',alignItems:"center"
    },
    datecontainer:{
      marginVertical:10,resizeMode:"cover",borderRadius:10,height:widthPercentageToDP("90%"),
    justifyContent:"center"
    },
   
 

})
