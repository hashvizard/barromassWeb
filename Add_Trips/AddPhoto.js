import React,{useState} from "react";
import {Platform,TouchableOpacity,Text, ActivityIndicator} from "react-native";
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from '../Constants/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const AddPhoto = (props) =>{


    
const [imagePath,setimagepath]=useState("");
const [Loading,setLoading]=useState(false);

const [Total,setTotal]=useState("");
const [Sent,setSent]=useState("");


const UpdateData =(val)=>{

  props.URl(val)  

}


 const chooseFile = () => {
  

    ImagePicker.openPicker({
        width: 600,
        height: 600,
     
        compressImageQuality:1,
        forceJpg:true, 
        cropperActiveWidgetColor:Colors.Orange,
            cropperToolbarColor:Colors.Black,
            cropperToolbarWidgetColor:Colors.White,
            showCropGuidelines:false,
            cropperToolbarTitle:"Crop Image",
            showCropFrame:false,
            avoidEmptySpaceAroundImage:true,
            cropperStatusBarColor:Colors.Black,
          cropping:true
      }).then(response => {
  
        let path = getPlatformPath(response).value;
        let fileName = getFileName(response.fileName, path);
        setimagepath(path);
        
        uploadImageToStorage(path, fileName);
    
    
    });
  

   
    };

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
            setTotal(taskSnapshot.totalBytes);
            setSent(taskSnapshot.bytesTransferred);
          
          });
        task.then(() => {
            
            storage()
            .ref('/' + name) //name in storage in firebase console
            .getDownloadURL()
            .then((URL) => {
                UpdateData(URL)
           
            setLoading(false)
            })
            .catch((e) => console.log('Errors while downloading => ', e));

      
            
        }).catch((e) => {
            status = 'Something went wrong';
            console.log('uploading image error => ', e);
            setLoading(false);
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
         
<TouchableOpacity 

onPress={()=>chooseFile()}

style={{width:200,alignItems:"center",justifyContent:'center',
aspectRatio:1/1,borderRadius:10,backgroundColor:"lightgrey"}}>

{Loading?
<ActivityIndicator size="small" color="black" />
:<Icon name="image-plus" size={35} color="white" />
}

</TouchableOpacity>
        )
    
}


    
export default AddPhoto
