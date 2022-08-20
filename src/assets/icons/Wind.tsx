import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { memo } from 'react';

const SvgComponent = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Path
      d="M12.983 28a1 1 0 0 0 .945-.629l3.841-9.601 9.602-3.841A1 1 0 0 0 28 13v-.016a1 1 0 0 0-.658-.924l-22-8a1 1 0 0 0-1.283 1.282l8 22a1 1 0 0 0 .925.658h-.001Z"
      fill="#fff"
    />
  </Svg>
);

const WindIcon = memo(SvgComponent);
export default WindIcon;
