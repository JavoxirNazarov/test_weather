import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';

const SvgComponent = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      d="M25 20c0 5.523-3.477 9-9 9s-9-3.477-9-9c0-5.927 6.452-13.928 8.43-16.242a.75.75 0 0 1 1.14 0C18.548 6.072 25 14.073 25 20Z"
      stroke="#fff"
      strokeWidth={2}
      strokeMiterlimit={10}
    />
    <Path
      d="M21.5 20.5A4.5 4.5 0 0 1 17 25"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HumidityIcon = memo(SvgComponent);
export default HumidityIcon;
