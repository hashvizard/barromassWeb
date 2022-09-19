import React, {useState, useRef, useEffect,useContext} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet,Text, View,StatusBar, Image,Keyboard,TouchableOpacity,Alert,PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import {GenericStyles} from '../../styles/GenericStyles';
import {

  CustomScreenContainer,
  CustomText,
  CustomTextInput,
  CustomButton,

} from '../../lib';
import { Button,TextInput } from 'react-native-paper';

import * as RootNavigation from '../../../../RootNavigation'

import {isAndroid, logErrorWithMessage} from '../../utilities/helperFunctions';
import TimerText from './TimerText';
import RNOtpVerify from 'react-native-otp-verify';

import { AppContext } from '../../../../Providers/AppProvider';

import axios from 'react-native-axios'
import url from '../../../../Constants/Database';

import Colors from '../../../../Constants/Colors';



const RESEND_OTP_TIME_LIMIT = 30; // 30 secs
const AUTO_SUBMIT_OTP_TIME_LIMIT = 60; // 4 secs

let resendOtpTimerInterval;
let autoSubmitOtpTimerInterval;

const OtpVerification = function(props) {


  const userinfo=useContext(AppContext);
  
  const [ConfirmResult, setconfirmResult] = useState("123456");

  const MobileNumber=`+91 ${props.route.params.MobileNumber}`;
 
  const Data=props.route.params.Data;
  
 
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const [submittingOtp, setSubmittingOtp] = useState(false);
 
  const [invalidCode,setInvalidCode]=useState(false);

  const [Verifing,setVerifing]=useState(false);

  const [Success,setSuccess]=useState(false);

  const [Checked,setChecked]=useState(false);




  // in secs, if value is greater than 0 then button will be disabled
  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );

  // 0 < autoSubmitOtpTime < 4 to show auto submitting OTP text
  const [autoSubmitOtpTime, setAutoSubmitOtpTime] = useState(
    AUTO_SUBMIT_OTP_TIME_LIMIT,
  );

  // TextInput refs to focus programmatically while entering OTP
  const firstTextInputRef = useRef(true);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fifthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);

  // a reference to autoSubmitOtpTimerIntervalCallback to always get updated value of autoSubmitOtpTime
  const autoSubmitOtpTimerIntervalCallbackReference = useRef();

  useEffect(() => {
    // autoSubmitOtpTime value will be set after otp is detected,
    // in that case we have to start auto submit timer
    autoSubmitOtpTimerIntervalCallbackReference.current = autoSubmitOtpTimerIntervalCallback;
  });




  useEffect(() => {
 
    RNOtpVerify.getOtp()
    .then(p => RNOtpVerify.addListener(otpHandler))
    .catch(p => createTwoButtonAlert2(p));


    return () => {
      RNOtpVerify.removeListener();
    }
  }, [])


 const otpHandler = (message) => {
    const otp =message.slice(0, 6);
    let dat=[];
    for (var i = 0; i < otp.length; i++) {
      dat[i]=otp.charAt(i);
    }
     setOtpArray(dat)
     setChecked(true)
    RNOtpVerify.removeListener();
    Keyboard.dismiss();
}
  



const createTwoButtonAlert2 = (val) =>
Alert.alert(
  `${val} OTP`,
  `${val} `,
  [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ]
);



const Verified=()=>{

 
        Keyboard.dismiss()
        userinfo.login({id:props.route.params.MobileNumber,Admin:false});
        setInvalidCode(false)
        setSuccess(true)
        setVerifing(false)


      props.navigation.navigate("Book",{id:Data.id,price:Data.price,Haridwar:Data.Haridwar,Delhi:Data.Delhi,Base:Data.Base,Dehradun:Data.Dehradun})
      
 }

  const [keyboardshown, setkeyboardshow] = useState(true)

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);


  const _keyboardDidShow = () => {
    setkeyboardshow(true)
  };

  const _keyboardDidHide = () => {
    setkeyboardshow(false)
  };


 



  useEffect(() => {

   signInWithPhoneNumber(MobileNumber);
 console.log("i was here")
   
    return () => {
     
    }
  },[])

  const validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    return regexp.test(MobileNumber)
    }



  const signInWithPhoneNumber=(MobileNumber) =>{
    console.log("i was here2")
    if (validatePhoneNumber()) {
    auth()
    .signInWithPhoneNumber(MobileNumber)
    .then(confirmResult => {
    
      setconfirmResult(confirmResult);
    })
    .catch(error => {
      alert(error.message)
      console.log(error)
    })
  }
 
   
 
 
  }


 



  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
  }, [resendButtonDisabledTime]);

  

  const startResendOtpTimer = () => {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  };

  // this callback is being invoked from startAutoSubmitOtpTimer which itself is being invoked from useEffect
  // since useEffect use closure to cache variables data, we will not be able to get updated autoSubmitOtpTime value
  // as a solution we are using useRef by keeping its value always updated inside useEffect(componentDidUpdate)
  const autoSubmitOtpTimerIntervalCallback = () => {
    if (autoSubmitOtpTime <= 0) {
      clearInterval(autoSubmitOtpTimerInterval);

      // submit OTP
      onSubmitButtonPress();
    }
    setAutoSubmitOtpTime(autoSubmitOtpTime - 1);
  };



  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  const onResendOtpButtonPress = () => {
   
   
   setInvalidCode(false);
   
    // clear last OTP
    if (firstTextInputRef) {
      setOtpArray(['', '', '', '','','']);
      firstTextInputRef.current.focus();
    }

    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();

    signInWithPhoneNumber(MobileNumber);


  };

  




  const onSubmitButtonPress = () => {
    
    setVerifing(true);
   
     let Otp="";

     otpArray.map(name => {
     
       Otp=`${Otp}${name}`
      
      });

      if (Otp.length == 6) {


      
        if(!Checked){
        try{
           ConfirmResult
          .confirm(Otp)
          .then(user => {
            
            if(user){
              setVerifing(false);
              Verified();
            }
            else{
              setVerifing(false);
              setInvalidCode(true);
              setOtpArray(['', '', '', '', '', '']);
            }
     
         
      
          })
          .catch(error => {
            alert(error.message)
            setVerifing(false);
            console.log(error)
          })
        }
        catch (error) {
          setInvalidCode(true);
          setVerifing(false)
        }
        }
        else{
         
          setVerifing(false);
          Verified();
        }

      } else {
        setVerifing(false);
      setInvalidCode(true);
      }
 

   
  };

  // this event won't be fired when text changes from '' to '' i.e. backspace is pressed
  // using onOtpKeyPress for this purpose
  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        // do nothing when a non digit is pressed
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      setOtpArray(otpArrayCopy);

      // auto focus to next InputText if value is not blank
      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        
        } else if (index === 3) {
          fifthTextInputRef.current.focus();
        
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
        }
      }
    };
  };

  // only backspace key press event is fired on Android
  // to have consistency, using this event just to detect backspace key press and
  // onOtpChange for other digits press
  const onOtpKeyPress = index => {
    return ({nativeEvent: {key: value}}) => {

      setInvalidCode(false);


      // auto focus to previous InputText if value is blank and existing value is also blank
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } else if (index === 5) {
          fifthTextInputRef.current.focus();
        }
        

        /**
         * clear the focused text box as well only on Android because on mweb onOtpChange will be also called
         * doing this thing for us
         * todo check this behaviour on ios
         */
        if (isAndroid && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = ''; // clear the previous box which will be in focus
          setOtpArray(otpArrayCopy);
        }
      }
    };
  };




  return (<>
          <View style={{flex:1,backgroundColor:Colors.Black}}>
            <StatusBar hidden={false} backgroundColor="#f7f7f7" barStyle="dark-content" />
          
          
 <View style={{flex:1,backgroundColor:Colors.White,
         justifyContent:"space-around",
       padding:20}}>
          <View style={{flexDirection:"row",alignItems:"center"}}>
              
              <TouchableOpacity onPress={()=>{
                Keyboard.dismiss()
                props.navigation.goBack()}}>
            <Icon name="arrow-left" size={30} style={{marginRight:15}} />
            </TouchableOpacity>
         <Image  source={require('../../../../Assets/Front.png')}
          style={{width:100,height:100,aspectRatio:1/1,resizeMode:"contain"}} />
          </View>
               <Text style={{fontSize:25,color:"#292b2c"}}>Confirm Your Number</Text>
               <Text style={{fontSize:14,color:Colors.GREEN}}
               >{invalidCode?"Entered Wrong OTP":`+91 ${props.route.params.MobileNumber} Otp Sent`}</Text>
        


        
    
          </View>
          

           


        </View>
  
        <View style={styles.container}>

  
          <View style={[GenericStyles.row, GenericStyles.mt12]}>
            {[
              firstTextInputRef,
              secondTextInputRef,
              thirdTextInputRef,
              fourthTextInputRef,
              fifthTextInputRef,
              sixthTextInputRef,
            ].map((textInputRef, index) => (
              <CustomTextInput
                containerStyle={[GenericStyles.fill, GenericStyles.mr12]}
                value={otpArray[index]}
                onKeyPress={onOtpKeyPress(index)}
                onChangeText={onOtpChange(index)}
                placeholder="*"

                onSubmitEditing={()=>{onSubmitButtonPress()}}
                keyboardType={'numeric'}
                maxLength={1}
                style={[styles.otpText, GenericStyles.centerAlignedText,styles.center]}
                autoFocus={index === 0 ? true : undefined}
                refCallback={refCallback(textInputRef)}
                key={index}
              />
            ))}
          </View>
       
          {resendButtonDisabledTime > 0 ? (
            <TimerText
            
            
            text={'Resend OTP in'} time={resendButtonDisabledTime} />
          ) : (
            <CustomButton
              type={'link'}
              text={'Resend OTP'}
              buttonStyle={styles.otpResendButton}
              textStyle={styles.otpResendButtonText}
              onPress={onResendOtpButtonPress}
            />
          )}



<Button  mode="contained"

onPress={() => {onSubmitButtonPress()}} loading={Verifing}

contentStyle={{justifyContent:"space-around",backgroundColor:Colors.primary}}
dark={false}
>
    {Verifing?"Please Wait..":"Book Now"}
  </Button>

        </View>
        
     
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
   backgroundColor:Colors.White,
    flex: 1,
    justifyContent:"space-around",
    borderTopRightRadius:20,
    borderTopLeftRadius:20
    },
  ButtonText:{
color:'black',

  },
  Button:{
    backgroundColor:Colors.Orange,
    padding:"4%",
    borderRadius:20,
    justifyContent:"center",
    alignItems:"center",
    margin:"4%"
  },
  center:{
textAlign:'center'
  },
  title:{
    
   
    fontSize:25,
    
    fontFamily:"Roboto-Bold",
    
    paddingVertical:"4%"

  },
  submitButtonText: {
    color: "green",
  },
  otpResendButton: {
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
  },
  otpResendButtonText: {
    color: "red",
    textTransform: 'none',
    textDecorationLine: 'underline',
  },
  otpText: {
  color:Colors.Black,
  fontSize:21,
  fontWeight:"bold"
  },
});

OtpVerification.defaultProps = {
  
  otpRequestData: {
    username: 'varunon9',
    email_id: false,
    phone_no: true,
  },
};

OtpVerification.propTypes = {
  otpRequestData: PropTypes.object.isRequired,
 
};

export default OtpVerification;
