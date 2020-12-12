import React, { FunctionComponent, useState, useEffect, memo } from 'react';

import { Modal } from 'antd-mobile';

interface NoticeModalProps {
  lat: number
  lng: number
}

const NoticeModal: FunctionComponent<NoticeModalProps> = ({ lat, lng }) => {
  const [isVibislbe, setIsVibislbe] = useState(false);
  const isKorea = lng >= 124 && lng <= 132 && lat >= 33 && lat <= 43;

  useEffect(() => {
    if (isKorea) {
      setIsVibislbe(true);
      return;
    }
    setIsVibislbe(false);
  }, [lat]);

  return (
    <Modal
      visible={isVibislbe}
      transparent
      maskClosable={true}
      onClose={() => setIsVibislbe(false)}
      title="🚨 알림"
      style={{ fontSize: '20px' }}
      footer={[{ text: '닫기', onPress: () => {
        setIsVibislbe(false);
      } }]}
    >
      <div style={{ height: 360, fontSize: '17px' }}>
        <br />
        국내에서는 Google Maps API의
        사용이 제한되어, 해당 어플을 정상적으로 사용할 수 없습니다.
        정상적으로 이용하시려면 크롬 개발자 도구의 sensor 를 이용하여
        국외로 <strong>현재위치를 변경</strong>해주세요
        <br />
        <br />
        <br />
        <strong>───── 설정방법 ─────</strong><br />
        1. 크롬 개발자도구를 연다<br />
        2. control Devtools 클릭<br />
        3. More tools - Sensors 클릭<br />
        4. Location으로 현재위치 설정<br />
      </div>
    </Modal>
  );
};

export default memo(NoticeModal);
