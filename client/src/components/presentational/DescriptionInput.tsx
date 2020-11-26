import React, { FunctionComponent } from 'react';

import { TextareaItem } from 'antd-mobile';

interface DescriptionInputProps {
  placeholder: string;
}

const DescriptionInput: FunctionComponent<DescriptionInputProps> = ({ placeholder }) => {
  return (
    <TextareaItem placeholder={placeholder} rows={5} count={100} />
  );
};

export default DescriptionInput;
