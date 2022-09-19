import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,Image,ScrollView,TouchableOpacity } from 'react-native'
import { Button, TextInput ,Caption} from 'react-native-paper'
import Colors from '../Constants/Colors'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import axios from 'react-native-axios'
import url from '../Constants/Database';
import {Picker} from '@react-native-picker/picker';
const AddBanner = (props) => {

const [image,setimage]=useState("")


const [Path,setPath]=useState("")

const [Filename,setFilename]=useState("")

const [Loading,setLoading]=useState(false)

const [Location,setLocation]=useState([])

const [chooseLocation,setchooseLocation]=useState("")


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
     setchooseLocation(responseJson[1][0])
      setLocation(responseJson[1])
    
     })
     
     // Showing response message coming from server after inserting records.
         .catch((error) => {
           console.error(error);
         });
   
    
     return function cleanup () {
   abortController.abort()
  }
  
  }, [])


const getFileName=(name, path)=> {
    if (name != null) { return name; }

    if (Platform.OS === "ios") {
        path = "~" + path.substring(path.indexOf("/Documents"));
    }
    return path.split("/").pop();
}

const uploadImageToStorage =(path, name) =>{
  
    setLoading(true);
   
   
    let reference = storage().ref(name);

    let task = reference.putFile(path);
   
   
    task.on('state_changed', taskSnapshot => {
       
      
      });
    task.then(() => {
        
        storage()
        .ref('/' + name) //name in storage in firebase console
        .getDownloadURL()
        .then((URL) => {
            UpdateDatabase(URL)
        })
        .catch((e) => console.log('Errors while downloading => ', e));

  
        
    }).catch((e) => {
        status = 'Something went wrong';
        console.log('uploading image error => ', e);
        setLoading(false);
    });
}

const UpdateDatabase=(val)=>{

     
    axios.post(`${url}/HomePage/AddBanner.php`,{
        image:val,
        location:chooseLocation
    })
    .then(function (response) {
     
        if(response.data){
            setLoading(false);
            props.navigation.goBack();
        }


    })
    .catch(function (error) {
      console.log(error);
      return(false);
    });

}

/**
 * Get platform specific value from response
 */
const getPlatformPath =({ path, uri }) => {
    return Platform.select({
        android: { "value": path },
        ios: { "value": uri }
    })
}



    return (
        <ScrollView style={{flex:1,padding:15}}>
            <TouchableOpacity
            
            onPress={()=>{
                ImagePicker.openPicker({
               
                  aspectRatio:16/9,
                 cropping:true
                 
                }).then(response => {

                    let path = getPlatformPath(response).value;
                    let fileName = getFileName(response.fileName, path);
                
                    setPath(path);
                    setFilename(fileName);


                  setimage(response.path)
            
                });
          
                  }}
            style={{borderWidth:1,aspectRatio:16/9,justifyContent:"center",
        alignItems:"center",borderRadius:10}}>
      
            {image == ""?
                <Text>Add Image</Text>
            :

            <Image source={{uri :image}} style={{width:"100%",height:"100%",resizeMode:"cover",
            borderRadius:10}} />
            }
      
            </TouchableOpacity>
            <View style={{marginVertical:10,alignSelf:"center"}}>
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
  {Location.map((item)=>{
      return(
<Picker.Item label={item} value={item}  />
      )
  })
  }
</Picker>


      <Button 
      style={{backgroundColor:Colors.YELLOW,marginTop:20}}
      loading={Loading}
      disabled={image != "" ?false:true}
      onPress={()=>uploadImageToStorage(Path,Filename)}
      mode="contained"
      
      >Save Banner</Button>

        </ScrollView>
    )
}

export default AddBanner

const styles = StyleSheet.create({})
