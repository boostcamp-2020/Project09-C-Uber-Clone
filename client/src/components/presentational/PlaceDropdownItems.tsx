import React, { FunctionComponent, ReactNode } from 'react';

import { Menu } from 'antd-mobile';
import { ValueType } from 'antd-mobile/lib/menu/PropsType';

interface PlaceDropdownItemProps {
  data: Array<{label: ReactNode, value:{placeName: string, location: string}}>;
  height?: number;
  onChange: ([value]?: ValueType) => any;
}

const PlaceDropdownItemProps: FunctionComponent<PlaceDropdownItemProps> = ({
  data,
  height = (document.documentElement.clientHeight / 2),
  onChange,
}) => {
  return (
    <Menu data={data} level={1} height={height} onChange={onChange}/>
  );
};

export default PlaceDropdownItemProps;
