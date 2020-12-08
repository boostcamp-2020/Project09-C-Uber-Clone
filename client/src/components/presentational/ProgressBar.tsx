import React, { FunctionComponent, useState, useEffect } from 'react';

import { Progress, WhiteSpace } from 'antd-mobile';

interface ProgressBarProps {
  time: number
}

const ProgressBar: FunctionComponent<ProgressBarProps> = ({ time }) => {
  const [percent, setPercent] = useState(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPercent(percent - 10.7 / (time / 1000));
    }, 100);
    return () => clearTimeout(timer);
  }, [percent]);

  return (
    <>
      <Progress
        percent={percent}
        position="normal"
        barStyle={{ border: '3px solid #284403' }}
      />
      <WhiteSpace />
    </>
  );
};

export default ProgressBar;
