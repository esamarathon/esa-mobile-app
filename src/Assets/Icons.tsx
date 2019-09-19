import React from 'react';
import {Svg, Rect, Path} from 'react-native-svg';

interface IProps {
    size?: number;
    fill?: string;
}

export function MenuButton({size = 24, fill = '#000'}: IProps) {
    return (
        <Svg width={(size * 8) / 7} height={size} viewBox="0 0 8 7" fill="none">
            <Rect width="8" height="1" fill={fill} />
            <Rect y="3" width="8" height="1" fill={fill} />
            <Rect y="6" width="5.5" height="1" fill={fill} />
        </Svg>
    );
}

export function NotificationBell({size = 24, fill = '#000'}: IProps) {
    return (
        <Svg width={(size * 36) / 39} height={size} viewBox="0 0 36 39" fill="none">
            <Path
                d="M34.44 29.598a11.722 11.722 0 0 1-4.162-8.97V15.75c0-6.158-4.575-11.256-10.5-12.11V1.75a1.75 1.75 0 1 0-3.5 0v1.89c-5.928.854-10.5 5.952-10.5 12.11v4.879c0 3.463-1.518 6.732-4.18 8.983a3.057 3.057 0 0 0-1.07 2.325A3.066 3.066 0 0 0 3.59 35h28.875a3.066 3.066 0 0 0 3.063-3.063c0-.896-.39-1.742-1.087-2.34zM18 39c2.465 0 4.526-1.721 5-4H13c.474 2.279 2.536 4 5 4z"
                fill={fill}
            />
        </Svg>
    );
}
