import React from 'react';
import Svg, { Path } from 'react-native-svg';

const DownArrow = ({ 
  size = 24, 
  color = "#000000", 
  strokeWidth = 2,
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
      <Path
        d="M7 10L12 15L17 10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DownArrow;