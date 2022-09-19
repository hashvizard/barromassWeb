import 'react-native-gesture-handler';
import * as React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import {AppProvider} from './Providers/AppProvider'
import StartApp from './StartApp';
import withCodePush from './CodePush'


LogBox.ignoreAllLogs(true)
const App =()=> {
  return (
    <NavigationContainer ref={navigationRef}>
     <AppProvider>
     <StartApp />
     </AppProvider>
    </NavigationContainer>
    );
  }
  export default withCodePush(App)