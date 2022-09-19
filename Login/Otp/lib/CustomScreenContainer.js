import React from 'react';
import {StatusBar, SafeAreaView} from 'react-native';

import {GenericStyles} from '../styles/GenericStyles';

const CustomScreenContainer = props => {
  const {children} = props;

  return (
    <>
      
      <SafeAreaView style={GenericStyles.whiteBackgroundContainer}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default CustomScreenContainer;
