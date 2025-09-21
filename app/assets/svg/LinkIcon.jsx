import React from 'react';
import Svg, { Path } from 'react-native-svg';

const LinkIcon = ({ 
  size = 16, 
  color = "#6B7280", 
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
        d="M15 7H20A5 5 0 0 1 20 17H15"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 17H4A5 5 0 0 1 4 7H9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 12H16"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default LinkIcon;