import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
function SvgComponent(props) {
  const {size = 20, color = 'white'} = props;
  return (
      <TouchableOpacity onPress={()=>props.navigation.openDrawer()}>
    <Icon name="menu" size={25} color="white" />
    </TouchableOpacity>
  );
}

export default SvgComponent;