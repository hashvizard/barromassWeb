import React,{useState,useEffect,useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native';
import {Subheading,Button, Title} from 'react-native-paper'
import * as RootNavigation from '../RootNavigation'
import axios from 'react-native-axios'
import url from '../Constants/Database';
import { AppContext } from '../Providers/AppProvider';
import Colors from '../Constants/Colors';

const BookingTrip = (props) => {

    const [updated,setupdated]=useState(true)
    
    const UserInfo=useContext(AppContext);

    useEffect(() => {

        axios.post(`${url}/HomePage/Booked.php`, {
            tripid:props.route.params.tripid,
            person:props.route.params.person,
            traveling:props.route.params.traveling,
            Name:props.route.params.Name,
            Mobile:props.route.params.Mobile,
            Address:props.route.params.Address,
            issue:props.route.params.issue,
            userid:props.route.params.userid,
            Fullpayment:props.route.params.Fullpayment,
            BookingAmount:props.route.params.BookingAmount,
            dateid:props.route.params.current,
            payid:props.route.params.payid,
            sharing:props.route.params.Sharing,
            token:props.route.params.token,
            Route:props.route.params.selected,
        })
        .then(function (response) {
     console.log(response.data)
            if(response.data){
              
              UserInfo.UpdateData({name:props.route.params.Name,
                                  Mobile:props.route.params.Mobile,
                                  Address:props.route.params.Address,
                                  issue:props.route.params.issue,
                                  email:props.route.params.email})
              
              SendNotification()
            }
        
         
        })
        .catch(function (error) {
          console.log(error);
          return(false);
        });
       
       
        return () => {
          
        }
      
        
       }, [])
    
       const SendNotification =()=>{
     
          axios.post(`${url}/Notification/Bookings.php`, {
         
              title:"A New Booking",
              Description:"Check Upcoming Bookings to know more..",
              
              })
            .then(function (response) {
              setupdated(false);  
             
            })
            .catch(function (error) {
              console.log(error);
              return(false);
            });
        
        
        }

    return (<View style={{height:"100%",width:"100%",}}>

       <View style={{position:"absolute",zIndex:20,height:"100%",width:"100%",justifyContent:"space-between",alignItems:"center"}}>
       <View style={{top:50,margin:20}}>
        <Title style={{textAlign:"center"}}>Trip Booked</Title>
       <Subheading style={{textAlign:"center"}}>“Like all great travellers, I have seen more than I remember and remember more than I have seen.”</Subheading>
       </View>
       <Button

       onPress={()=>RootNavigation.navigate('Bookings')}
       style={{bottom:50,backgroundColor:Colors.nAVY_BLUE}}
       disabled={updated}
       mode="contained">{updated?"Please Wait..":"See your Booking"}</Button>
       </View>

        <LottieView
          source={require('../Animations/Booked.json')}
          colorFilters={[{
            keypath: "button",
            color: "black"
          },{
            keypath: "Sending Loader",
            color: "#F00000"
          }]}
         autoPlay={true}
         loop={false}
         resizeMode="contain"
        style={{flex:1}}
        />
        </View>)
}

export default BookingTrip

const styles = StyleSheet.create({})
