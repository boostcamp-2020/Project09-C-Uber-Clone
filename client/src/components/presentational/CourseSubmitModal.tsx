import React, { useState } from 'react';

import { Modal, List, Button, WhiteSpace, WingBlank } from 'antd-mobile';

const CourseSubmitModal = ({ time, distance, onClick, disabled } : {time: any, distance: any, onClick: any, disabled: any}) => {
  const [modal, setModal] = useState(false);

  const showModal = (e: any) => {
    e.preventDefault();
    setModal(true);
  };
  const onClose = () => {
    setModal(false);
  };

  return (
    <WingBlank>
      <Button
        onClick={showModal}
        disabled={disabled}
        style={{ backgroundColor: '#56A902', color: '#FFFFFF' }}
      >경로 선택 완료</Button>
      <WhiteSpace />
      <Modal
        popup
        visible={modal}
        onClose={onClose}
        animationType="slide-up"
      >
        <List renderHeader={() => <div>운행정보를 확인해주세요</div>}>
          {([<List.Item key={1}>예상 시간 : {time}</List.Item>,
            <List.Item key={2}>총 거리 : {distance}</List.Item>])}
          <List.Item>
            <Button type="primary"
              onClick={onClick}
              style={{ backgroundColor: '#ff4444' }}
            >운행요청</Button>
          </List.Item>
        </List>
      </Modal>
    </WingBlank>
  );
};

export default CourseSubmitModal;
