import React,{useState,useEffect,useContext} from 'react'
import { StyleSheet, Text, View,StatusBar,TouchableOpacity,ScrollView,Alert } from 'react-native'
import Colors from '../Constants/Colors';
import { TextInput,Title,Subheading, Button } from 'react-native-paper';
import axios from 'react-native-axios'
import url from '../Constants/Database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppContext } from '../Providers/AppProvider';
import RazorpayCheckout from 'react-native-razorpay';
import messaging from '@react-native-firebase/messaging';
import Pricing from './Pricing';

const Booking = (props) => {
    
  const UserInfo=useContext(AppContext);

    const [person,setperson]=useState(1);

    const [Name, setName] = React.useState(UserInfo.Name);

    const [Mobile, setMobile] = React.useState(UserInfo.userid);

    const [Address, setAddress] = React.useState(UserInfo.Address);

    const [issue, setissue] = React.useState(UserInfo.issue);

    const [current, setcurrent] = React.useState(0);

    const [OurDates,setOurDates]=useState([])
    
    const [selectedDate,setselectedDate]=useState("")
    
    const [loading,setloading]=useState(false)
    const [loading1,setloading1]=useState(false)



    const [Haridwar] = React.useState(props.route.params.Haridwar);

    const [Delhi] = React.useState(props.route.params.Delhi);

    const [Base] = React.useState(props.route.params.Base);

    const [Dehradun] = React.useState(props.route.params.Dehradun);

    const [Point, setPoint] = React.useState('Base');


    const [Sharing, setSharing] = React.useState('Quad Sharing');


    const [Price, setPrice] = React.useState(props.route.params.price);

    const [token, settoken] = React.useState("");

    const [email, setemail] = React.useState("");

 


    const createTwoButtonAlert = () =>
    Alert.alert(
      "Payment Failed",
      "Try Again to Book your Trip",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );


useEffect(() => {

  messaging()
  .getToken()
  .then(token => {
 settoken(token)
  });
  return () => {

  }
}, [])

    useEffect(() => {

        axios.post(`${url}/HomePage/TripDates.php`, {
          id:props.route.params.id
        })
        .then(function (response) {
    
          setOurDates(response.data)
        })
        .catch(function (error) {
          console.log(error);
          return(false);
        });
       
       
        return () => {
         
        }
      
        
       }, [])


       const checkdata=()=>{

        if(selectedDate != '' && email != '' && Name != '' && Mobile != '' && issue != '' && Address != ''){
            return false
        }
        else{
            return true;
        }
       }


 

    return (
        <ScrollView style={{flex:1}}>
            <StatusBar translucent={false} backgroundColor={Colors.ORANGE} />
            <Subheading style={{margin:15,marginTop:20}} >Fill Out the Neccesarry Information</Subheading>

              <View style={{padding:15,flexDirection:'row',alignItems:"center",
            justifyContent:"space-between"}}>
                  <Text>No. of Adults</Text>
                     <View>

                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <TouchableOpacity 
                            onPress={()=>{
                                if(person >= 2){
                                    setperson(person-1)
                                }
                            }}
                            >
                         <Icon name="minus-box"  size={35} color={Colors.RED} />
                         </TouchableOpacity>
                         <Title style={{paddingHorizontal:10}}>{person} People</Title>
                         <TouchableOpacity
                         
                         onPress={()=>{
                          
                                setperson(person+1)
                          
                        }}
                         >
                         <Icon name="plus-box"  size={35} color={Colors.GREEN}/>
                         </TouchableOpacity>
                         </View>
                     </View>
              </View>







   {/**
       |--------------------------------------------------
       |Sharing Option 
       |--------------------------------------------------
       */}
 

              <View style={{margin:15}}>
      <Title>Departure From</Title>
       </View>
 

       <View>
   

        <ScrollView horizontal={true} 
showsHorizontalScrollIndicator={false}
contentContainerStyle={{paddingStart:15,marginVertical:10}} >


<TouchableOpacity 

onPress={()=>{
  setPoint("Base")
  }}
style={{elevation:2,backgroundColor:Point == "Base"?Colors.primary:Colors.lIGHT_GREY,borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
<Text>Base to Base</Text>
</TouchableOpacity>
 
<TouchableOpacity 

onPress={()=>{
  setPoint("Dehradun")}}

style={{elevation:2,backgroundColor:Point == "Dehradun"?Colors.primary:Colors.lIGHT_GREY,borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
<Text>Dehradun to Dehradun</Text>
</TouchableOpacity>


<TouchableOpacity 

onPress={()=>{
  setPoint("Haridwar")}}

style={{elevation:2,backgroundColor:Point == "Haridwar"?Colors.primary:Colors.lIGHT_GREY,borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
<Text>Haridwar to Haridwar</Text>
</TouchableOpacity>

<TouchableOpacity 

onPress={()=>{
  setPoint("Delhi")
}}

style={{elevation:2,backgroundColor:Point == "Delhi"?Colors.primary:Colors.lIGHT_GREY,borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
<Text>Delhi to Delhi</Text>
</TouchableOpacity>

</ScrollView>
</View>



       <View>
   

        <ScrollView horizontal={true} 
showsHorizontalScrollIndicator={false}
contentContainerStyle={{paddingStart:15,marginVertical:10}} >



<Pricing 
data={Point == "Base"?Base:Point == "Haridwar"?Haridwar:Point == "Dehradun"?Dehradun:Delhi}  
price={Price}
update={(price,sharing)=>{
setPrice(price)
setSharing(sharing)

}}

/>

</ScrollView>
</View>




       {/**
       |--------------------------------------------------
       |Sharing Price 
       |--------------------------------------------------
       */}




       <View style={{margin:15}}>
      <Title>Date of Travel</Title>
       </View>
       <View>
        <ScrollView horizontal={true} 
showsHorizontalScrollIndicator={false}
contentContainerStyle={{paddingStart:15,marginVertical:10}} >

{OurDates.map((item,index)=>{
  return(
<TouchableOpacity 
key={item.Id}
onPress={()=>{
    setcurrent(item.Id);
setselectedDate(item.date)}}
style={{elevation:2,backgroundColor:current == item.Id?Colors.primary:Colors.lIGHT_GREY,borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
<Text>{item.showdate} - {item.Available_seats} seats</Text>
</TouchableOpacity>
  )
})}


</ScrollView>
</View>
      
       <View style={{margin:15}}>
           <Title>Contact Details</Title>
       </View>
              <TextInput
            mode="outlined"
        style={{margin:10}}
      label="Full Name"
      value={Name}
     onChangeText={text => setName(text)}
    />

<TextInput
            mode="outlined"
        style={{margin:10}}
      label="Email"
      value={email}
      
             
      onChangeText={text => setemail(text)}
    />

            <TextInput
            mode="outlined"
        style={{margin:10}}
      label="Mobile Number"
      value={Mobile}
      maxLength={10}
             keyboardType="number-pad"
      onChangeText={text => setMobile(text)}
    />

<TextInput
            mode="outlined"
        style={{margin:10}}
      label="Your Address"
      value={Address}
                 multiline={true}   
      onChangeText={text => setAddress(text)}
    />

<TextInput
            mode="outlined"
        style={{margin:10}}
      label="Any Health Issue"
      value={issue}
                 
      onChangeText={text => setissue(text)}
    />


<Button
disabled={checkdata()?loading?true:true:false}
dark={false}
onPress={() => {
  setloading(true)

var options = {
  description: 'Paying for Trip Booking',

  currency: 'INR',
  key: 'rzp_live_GarULJKRDBOAHq', // Your api key
  amount: 99900 * person,
  name: Name,
  prefill: {
    email: email,
    contact: `+91 ${Mobile}`,
    name: Name
  },
  theme: {color: Colors.Orange}
}
RazorpayCheckout.open(options).then((data) => {

    props.navigation.navigate("Booked",{
    tripid:props.route.params.id,
    person:person,
    traveling:selectedDate,
    Name:Name,
    Mobile:Mobile,
    Address:Address,
    issue:issue,
    userid:UserInfo.userid,
    current:current,
    Sharing:Sharing,
    payid:data.razorpay_payment_id,
    token:token,
    selected:Point,
    email:email,
    Fullpayment:(Price * person) - (999 * person),
    BookingAmount:999 * person

})
setloading(false)

 
}).catch((error) => {
  setloading(false)
  createTwoButtonAlert()

  // handle failure

});

}}

loading={loading}

mode="contained"
style={{margin:10,justifyContent:'space-between',backgroundColor:Colors.Orange}}
>
    <Text style={{color:"white"}}>Pay Booking Amount</Text>


    <Text style={{fontWeight:"bold",fontSize:18}}>   ₹ {999 * person}</Text></Button>

<Button
disabled={checkdata()?loading?true:true:false}
dark={false}
onPress={() => {
  setloading1(true)

var options = {
  description: 'Paying for Trip Booking',

  currency: 'INR',
  key: 'rzp_live_GarULJKRDBOAHq', // Your api key
  amount: (Price * person) *100,
  name: Name,
  prefill: {
    email: email,
    contact: `+91 ${Mobile}`,
    name: Name
  },
  theme: {color: Colors.Orange}
}
RazorpayCheckout.open(options).then((data) => {

 
  props.navigation.navigate("Booked",{
    tripid:props.route.params.id,
    person:person,
    traveling:selectedDate,
    Name:Name,
    Mobile:Mobile,
    Address:Address,
    issue:issue,
    userid:UserInfo.userid,
    current:current,
    selected:Point,
    Sharing:Sharing,
    payid:data.razorpay_payment_id,
    token:token,
    email:email,
    Fullpayment: Price * person,
    BookingAmount:0

})
setloading1(false)
 
}).catch((error) => {
  setloading1(false)
  createTwoButtonAlert()

  // handle failure

});


}}

loading={loading1}

mode="contained"
style={{margin:10,justifyContent:'space-between',backgroundColor:Colors.YELLOW}}
>
    <Text style={{color:"white"}}>Make Full Payment</Text>
    <Text style={{fontWeight:"bold",fontSize:18}}>   ₹ {Price * person}</Text></Button>

        </ScrollView>
    )
}

export default Booking

const styles = StyleSheet.create({})
