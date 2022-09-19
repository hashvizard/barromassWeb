import React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  const {size = 18, color = 'black'} = props;
  return (
    <Svg
      height={size}
      width={size}
      fill="none"
      stroke="black"
      viewBox="0 0 24 24"
      {...props}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </Svg>
  );
}

export default SvgComponent;