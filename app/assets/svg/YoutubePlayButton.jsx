import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const YouTubePlayButton = ({ 
size = 24, 
backgroundColor = "#FF0000", 
playColor = "#FFFFFF",
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
    <Circle
    cx="12"
    cy="12"
    r="10"
    fill={backgroundColor}
    />
    <Path
    d="M10 8L16 12L10 16V8Z"
    fill={playColor}
    />
</Svg>
);
};

export default YouTubePlayButton;