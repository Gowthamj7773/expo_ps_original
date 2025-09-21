import React from 'react';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';

const SlotIcon = ({ 
size = 24, 
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
    {/* Calendar base */}
    <Rect
    x="3"
    y="4"
    width="18"
    height="16"
    rx="2"
    fill="#F8FAFC"
    stroke="#3B82F6"
    strokeWidth="2"
    />
    
    {/* Calendar header */}
    <Rect
    x="3"
    y="4"
    width="18"
    height="4"
    rx="2"
    fill="#3B82F6"
    />
    
    {/* Calendar rings */}
    <Line
    x1="7"
    y1="2"
    x2="7"
    y2="6"
    stroke="#6B7280"
    strokeWidth="2"
    strokeLinecap="round"
    />
    <Line
    x1="17"
    y1="2"
    x2="17"
    y2="6"
    stroke="#6B7280"
    strokeWidth="2"
    strokeLinecap="round"
    />
    
    {/* Time slots grid */}
    <Line x1="5" y1="10" x2="19" y2="10" stroke="#E5E7EB" strokeWidth="1" />
    <Line x1="5" y1="12.5" x2="19" y2="12.5" stroke="#E5E7EB" strokeWidth="1" />
    <Line x1="5" y1="15" x2="19" y2="15" stroke="#E5E7EB" strokeWidth="1" />
    <Line x1="5" y1="17.5" x2="19" y2="17.5" stroke="#E5E7EB" strokeWidth="1" />
    
    <Line x1="9" y1="8.5" x2="9" y2="19" stroke="#E5E7EB" strokeWidth="1" />
    <Line x1="13" y1="8.5" x2="13" y2="19" stroke="#E5E7EB" strokeWidth="1" />
    <Line x1="17" y1="8.5" x2="17" y2="19" stroke="#E5E7EB" strokeWidth="1" />
    
    {/* Available slot (green) */}
    <Rect
    x="5.5"
    y="9"
    width="3"
    height="2"
    rx="0.5"
    fill="#10B981"
    />
    <Circle cx="7" cy="10" r="0.3" fill="#FFFFFF" />
    
    {/* Booked slot (red) */}
    <Rect
    x="9.5"
    y="11.5"
    width="3"
    height="2"
    rx="0.5"
    fill="#EF4444"
    />
    <Path
    d="M10.5 12.5L11.5 13.5M11.5 12.5L10.5 13.5"
    stroke="#FFFFFF"
    strokeWidth="1.5"
    strokeLinecap="round"
    />
    
    {/* Selected/Current slot (blue) */}
    <Rect
    x="13.5"
    y="14"
    width="3"
    height="2"
    rx="0.5"
    fill="#3B82F6"
    />
    <Path
    d="M14.2 15L15 15.8L16.8 14"
    stroke="#FFFFFF"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    />
    
    {/* Pending slot (yellow) */}
    <Rect
    x="17.5"
    y="9"
    width="1.5"
    height="2"
    rx="0.5"
    fill="#F59E0B"
    />
    <Circle cx="18.25" cy="10" r="0.2" fill="#FFFFFF" />
    
    {/* Clock icon overlay */}
    <Circle
    cx="19"
    cy="16"
    r="3"
    fill="#FFFFFF"
    stroke="#3B82F6"
    strokeWidth="2"
    />
    <Path
    d="M19 14V16L20 17"
    stroke="#3B82F6"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    />
    
    {/* Booking confirmation sparkle */}
    <Path
    d="M6 6L6.5 7L7 6L6.5 5Z"
    fill="#FBBF24"
    />
    <Path
    d="M16 7L16.3 7.5L16.6 7L16.3 6.5Z"
    fill="#FBBF24"
    />
</Svg>
);
};

export default SlotIcon;