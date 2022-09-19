

import React from 'react'
import {View,Text, ActivityIndicator} from 'react-native'
import CodePush from 'react-native-code-push'
import LottieView from 'lottie-react-native';
import Colors from './Constants/Colors'

const Code_pUsh_Option={
    checkFrequency:CodePush.CheckFrequency.ON_APP_START,
  };
  
const withCodePush =WrappedComponent => {
 
   
    class WrappedApp extends  React.PureComponent{

      
      state={
        Update:false,
        status:"Updating Baaromaas",
        Ready:false
    }

componentDidMount(){
    
CodePush.sync({installMode:CodePush.InstallMode.IMMEDIATE},this.SyncWithCode,null)

CodePush.checkForUpdate()
.then((update) => {
  if (!update) {
                  
  this.setState({Update:false})
  console.log("The app is up to date!");
  } else {  
  this.setState({Update:true})
  }
  });
}
   


SyncWithCode= (Status) =>{

  console.log(Status)
 
}




 
render(){

  if(this.state.Update){
  return(<>
   
      <WrappedComponent /> 
    <View style={{position:"absolute",alignItems:"center",justifyContent:'center',
     width:"100%",height:"100%",backgroundColor:"rgba(255,255,255,1)"}}> 

<View style={{width:"80%",borderRadius:20,height:250,alignItems:"center",justifyContent:"space-evenly"}}>

<LottieView
source={require('./Animations/Update.json')}
colorFilters={[{
keypath: "button",
color: "black"
},{
keypath: "Sending Loader",
color: "#F00000"
}]}
autoPlay={this.state.Update}
loop={this.state.Update}


/>

</View> 

<View style={{alignItems:"center",backgroundColor:"white",padding:15,width:"100%",marginVertical:20}}>
<Text style={{fontSize:18,fontWeight:"bold",color:Colors.Black}}>Updating Baaromaas || Please Wait</Text>
<Text style={{fontSize:16,color:Colors.Black}}>Adding New Features</Text>
</View>       
    </View>
 </>
  );

}
else{
  return(
     <WrappedComponent /> 
  );
}

}
}
    return CodePush(Code_pUsh_Option)(WrappedApp)

};

export default withCodePush;



