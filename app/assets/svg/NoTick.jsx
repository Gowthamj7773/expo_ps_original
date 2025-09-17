import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const CheckboxEmpty = ({ 
  size = 24, 
  color = "#6B7280", 
  strokeWidth = 2,
  borderRadius = 4,
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
      <Rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx={borderRadius}
        ry={borderRadius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="transparent"
      />
    </Svg>
  );
};

export default CheckboxEmpty;