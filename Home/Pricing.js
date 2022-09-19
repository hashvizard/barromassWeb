import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Colors from '../Constants/Colors';
const Pricing = (props) => {

const [data, setdata] = useState(props.data)
const [price,setprice] =useState(0)

useEffect(() => {
    setdata(props.data)
    setprice(props.price)

    console.log(data,price)
    return () => {
        
    }
}, [props.data])

    return (
        data.map((item,index)=>{

      return(<>
        {item == 0 || item == "" || item == null? 
        <TouchableOpacity
        disabled={item == 0 || item == "" || item == null?true:false} 
       onPress={()=>{
       props.update(item,index == 0?"Double Sharing":index == 1?"Triple Sharing":"Quad Sharing")
       setprice(item)
       }}
       style={{elevation:2,backgroundColor:"lightgrey",borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
      <Text style={{color:"white"}}>Not Available</Text>
      </TouchableOpacity>
        :
      <TouchableOpacity 
       onPress={()=>{
       props.update(item,index == 0?"Double Sharing":index == 1?"Triple Sharing":"Quad Sharing")
       setprice(item)
       }}
       style={{elevation:2,backgroundColor:price == item?Colors.primary:Colors.lIGHT_GREY,borderRadius:10,marginRight:15,paddingHorizontal:10,paddingVertical:10,marginBottom:2}}>
      <Text style={{color:"black"}} >{index == 0?"Double":index == 1?"Triple":"Quad"} - Rs {item}</Text>
      </TouchableOpacity>
        }
      
      </>)
      })
    )
}

export default Pricing

const styles = StyleSheet.create({})
