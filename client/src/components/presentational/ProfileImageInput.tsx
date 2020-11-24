import React, { FunctionComponent } from 'react';

import { ImagePicker } from 'antd-mobile';

// interface ImageFile {
//   url: string;
//   [key: string]: any;
// }

interface ImagePickerProps {
  //files: ImageFile[];
  selectable: boolean;
}

const ProfileIamgeInput: FunctionComponent<ImagePickerProps> = ({ selectable }) => {
  return (
    <div>
      <ImagePicker selectable={selectable}/>
      <p>프로필 이미지 설정...</p>
    </div>
  );
};

export default ProfileIamgeInput;
