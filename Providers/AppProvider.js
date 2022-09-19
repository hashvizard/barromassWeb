import React,{Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios'
import url from '../Constants/Database';

export const AppContext =React.createContext();

class AppProvider extends Component{
state={
        Loggedin:false,
        Name:"",
        Mobile:"",
        Profile:"",
        userid:"",
        Address:"",
        issue:"",
        email:"",
        Admin:false
}


componentDidMount(){



        AsyncStorage.getItem('Baaromaas', (err, result) => {
       
        
           if (result !== null) {
            let val= JSON.parse(result) 
           
            this.setState({
              Loggedin:val.Loggedin,
              Name:val.Name,
              Mobile:val.Mobile,
              Profile:val.Profile,
              userid:val.userid,
              Address:val.Address,
              issue:val.issue,
              Admin:val.Admin,
              email:val.email
              })
          
           }
       
         else{
                let data={Name:'',
                        Loggedin:false,
                        Mobile:'',
                        Profile:'',
                        userid:'',
                        Address:'',
                        issue:'',
                        Admin:false,
                        email:''
                       }
         
                       AsyncStorage.setItem('Baaromaas', JSON.stringify(data)).catch(error => console.log('error!'));
                       this.setState({Loggedin:false})
        }
       
         });
         
       }


       
login =(val)=>{

  this.setState({Loggedin:true,userid:val.id,Admin:val.Admin});

console.log(val);
  AsyncStorage.getItem('Baaromaas', (err, result) => {
  
   
    if (result !== null) {
     let Demo= JSON.parse(result) ;
     Demo.Loggedin=true;
     Demo.userid=val.id;
     Demo.Admin=val.Admin;
     AsyncStorage.setItem('Baaromaas', JSON.stringify(Demo)).catch(error => console.log('error!'));
   
    }
  
  
  });

  this.forceUpdate();   

}

logout =()=>{

  this.setState({Loggedin:false,userid:'',Admin:false});


  AsyncStorage.getItem('Baaromaas', (err, result) => {
  
   
    if (result !== null) {
     let Demo= JSON.parse(result) ;
  
  
     Demo.Loggedin=false;
     Demo.Admin=false;
     Demo.userid='';
    
     AsyncStorage.setItem('Baaromaas', JSON.stringify(Demo)).catch(error => console.log('error!'));
   
    }
  
  
  });

  this.forceUpdate();   

}

              
  UpdateData = (val) =>{

        this.setState({Name:val.name,Mobile:val.Mobile,Address:val.Address,issue:val.issue,email:val.email});
        
        
        AsyncStorage.getItem('Baaromaas', (err, result) => {
        
         
          if (result !== null) {
           let Demo= JSON.parse(result) ;
        
        
           Demo.Name=val.name;
           Demo.Mobile=val.Mobile;
           Demo.Address=val.Address;
           Demo.issue=val.issue;
           Demo.email=val.email;
           AsyncStorage.setItem('Baaromaas', JSON.stringify(Demo)).catch(error => console.log('error!'));
         
          }
        
        
        });
        
        this.forceUpdate();
        
        }
     
render(){
	return( 
       <AppContext.Provider value={{

      ...this.state,
      UpdateData:this.UpdateData,
      login:this.login,
      logout:this.logout
    
       }}> 
        {this.props.children}
       </AppContext.Provider>

		)
}

}
const ProductConsumer = AppContext.Consumer;

export {AppProvider,ProductConsumer};