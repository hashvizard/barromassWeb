import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,Image,ScrollView,TouchableOpacity } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import Colors from '../Constants/Colors'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import axios from 'react-native-axios'
import url from '../Constants/Database';
const AddLocations = (props) => {

const [image,setimage]=useState("")
const [Title,setTitle]=useState("")

const [Path,setPath]=useState("")

const [Filename,setFilename]=useState("")

const [Loading,setLoading]=useState(false)




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

     
    axios.post(`${url}/HomePage/AddLocations.php`,{
        image:val,
        Title:Title
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
                  width: 450,
                  height: 300,
                  
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
      <TextInput 
      mode="outlined"
      style={{marginVertical:10}}
      placeholder="Add Locations"
        onChangeText={(text)=>setTitle(text)}
        value={Title}
      />

      <Button 
      style={{backgroundColor:Colors.YELLOW}}
      loading={Loading}
      disabled={image != "" && Title != ""?false:true}
      onPress={()=>uploadImageToStorage(Path,Filename)}
      mode="contained"
      
      >Save Locations</Button>

        </ScrollView>
    )
}

export default AddLocations

const styles = StyleSheet.create({})
