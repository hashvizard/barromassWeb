import React, {useState,useContext,useEffect} from 'react';
import {View, Text} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {AppContext} from '../Providers/AppProvider'

const ScreenLogin =(props)=>{


 const userinfo = useContext(AppContext);
 const [hel,hello] = useState(false);
 useEffect(() => {
  hello(true)
  }, [])

  const  getInfoFromToken = token => {
    
        const PROFILE_REQUEST_PARAMS = {
          fields: {
            string: 'id, name,  first_name, last_name',
          },
        };
        const profileRequest = new GraphRequest(
          '/me',
          {token, parameters: PROFILE_REQUEST_PARAMS},
          (error, result) => {
            if (error) {
             
              console.log('login info has error: ' + error);
            } else {

            console.log(result)
              userinfo.login(result)
              props.check();
              
       
            }
          },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
      };
    
      return (
        <View style={{}}>
          <LoginButton
         
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                   
                  const accessToken = data.accessToken.toString();
                  getInfoFromToken(accessToken);
                });
              }
            }}
            onLogoutFinished={() => userinfo.logout()}
          />
       
        </View>
      );
}

export default ScreenLogin
