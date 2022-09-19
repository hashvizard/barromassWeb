import React from 'react';
import { TouchableOpacity,Linking } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
function SvgComponent(props) {
  const {size = 20, color = 'white'} = props;
  return (
    <TouchableOpacity 
    
    onPress={()=>Linking.openURL('whatsapp://send?text=How Can we Help you&phone=+91 8650646568')}
    >
    <Icon name="whatsapp" size={25} color="white" />
    </TouchableOpacity>
  );
}

export default SvgComponent;