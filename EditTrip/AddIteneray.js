import React,{useState,useContext,useEffect} from 'react'
import { StyleSheet, Text, View,Alert,TouchableOpacity,ScrollView,ActivityIndicator ,Image} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import url from '../database';
import storage from '@react-native-firebase/storage';
import { AddTripContext } from '../Providers/AddTripProvider';
import { Button,TextInput,Caption } from 'react-native-paper';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const AddIteneray = (props) => {

    
    const Trip = useContext(AddTripContext)

    const [imagePath,setimagepath]=useState("");
    const [Name,setName]=useState("");
    const [Things,setThings]=useState([]);
    const [Highdemo,setHighdemo]=useState("");
    const [wait,setwait]=useState(false);
    const [upload,setUpload]=useState(false);  

    const [loading,setloading]=useState(false);  
    
useEffect(() => {
    if(props.route.params.edit){

        setimagepath(Trip.Itenary[props.route.params.category].Image);
        setName(Trip.Itenary[props.route.params.category].Heading);
        setThings(Trip.Itenary[props.route.params.category].Highlight);
 }

}, [])

  const  UpdateIteneray =()=>{
  setloading(true)
        if(props.route.params.edit){
            let abc={Image:imagePath,Heading:Name,Highlight:Things};
            Trip.Itenary[props.route.params.category]=abc;
            Trip.setItenaery([...Trip.Itenary]);
            props.navigation.goBack();
        }
          else{
              let abc={Image:imagePath,Heading:Name,Highlight:Things};
              Trip.Itenary.push(abc)
              Trip.setItenaery([...Trip.Itenary]);
              props.navigation.goBack();
          }

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




    return ( <View style={{paddingHorizontal:'4%',flex:1}}>
       <ScrollView showsVerticalScrollIndicator={false}> 

<View style={{borderWidth:2,borderColor:Colors.SILVER,borderRadius:10,marginVertical:10,width:"100%",aspectRatio:16/9}}>

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
<Text>Add Iteneray Photo</Text>
  </TouchableOpacity>
}             
</View>


<TextInput
value={Name}
mode="outlined"
placeholder="Heading"
onChangeText={(text)=>setName(text)}
style={{marginBottom:10}}
/>


<View style={{marginBottom:10}}>
<Caption style={{alignSelf:"center"}}>Things to Carry</Caption>
</View>

{Things.length > 0?

Things.map((item,index)=>{

return(
<View key={index} style={{flexDirection:"row",alignItems:'center',justifyContent:"space-between"}}>
<View style={{borderWidth:1,
  borderColor:"silver",flex:1,marginBottom:15,padding:15,borderRadius:10,backgroundColor:"white"}}>
<Text style={{color:"black"}}>{item}</Text>

</View>
<TouchableOpacity 

onPress={()=>{
  Things.splice(index, 1);

  setThings([...Things]);
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

<View style={{flex:1,marginBottom:10}}>


<TextInput
mode="outlined"
label="Add Trip Routine"

onChangeText={(text)=>{setHighdemo(text)}}
placeholder="Add Trip Routine" 
style={{backgroundColor:"white",flex:1}}
value={Highdemo}


      
onSubmitEditing={()=>{
  if(Highdemo != ""){
    setThings([...Things,Highdemo]);
    setHighdemo("");
  }
}}
blurOnSubmit={false}
/>



<Button 
icon="plus"
onPress={() => 
  {
    if(Highdemo != ""){
      setThings([...Things,Highdemo]);
      setHighdemo("");
    }
   
  }}
  dark={false}
style={{marginTop:10,backgroundColor:"#B8D8D8"}}
mode="contained" >
    Add
  </Button>

</View>

<Button 
loading={loading}
disabled={loading}
onPress={()=>{
    UpdateIteneray()
}}
mode="contained" style={{marginVertical:10}}>
    Save Iteneray
</Button>

        </ScrollView>
        </View>
    )
}

export default AddIteneray

const styles = StyleSheet.create({

    imageContainer:{
        borderRadius:10,aspectRatio:16/9,alignSelf:"center",
        width:"100%",borderWidth:2,borderColor:Colors.gREY,justifyContent:'center',alignItems:"center"
    },
})
