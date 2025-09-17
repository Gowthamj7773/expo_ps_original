import React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const CheckboxEmpty = ({ 
  size = 24, 
  color = "#6B7280", 
  strokeWidth = 2,
  borderRadius = 4,
  style = {},
  // New props for checked state
  fillColor = "#fff",
  tickColor = "#6B7280"
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
        fill={fillColor} // Changed from "transparent" to fillColor
      />
      
      {/* Added tick mark */}
      <Path
        d="M8 12L11 15L16 9"
        stroke={tickColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CheckboxEmpty;