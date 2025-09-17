import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const SearchIcon = ({
    size = 24,
    color = '#6B7280',
    strokeWidth = 2,
    style,
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
                cx={11}
                cy={11}
                r={8}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M21 21L16.65 16.65"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default SearchIcon;
