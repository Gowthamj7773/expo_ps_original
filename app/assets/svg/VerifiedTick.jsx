import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const VerifiedTickIcon = ({ 
  size = 20, 
  style = {} 
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
    >
      {/* Purple circle background */}
      <Circle
        cx="12"
        cy="12"
        r="10"
        fill="#7D53F6"
      />
      
      {/* White checkmark */}
      <Path
        d="M8.5 12L10.5 14L15.5 9"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
};

export default VerifiedTickIcon;