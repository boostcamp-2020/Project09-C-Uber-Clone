import React from 'react';

import styled from 'styled-components';

const Div = styled.div`
    width: 25px;
    height: 25px;
`;

const PinIcon = () => {

  return <Div>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 59 59" >
      <path d="M44.5,15c0-8.271-6.729-15-15-15s-15,6.729-15,15c0,7.934,6.195,14.431,14,14.949V58c0,0.553,0.448,1,1,1s1-0.447,1-1V29.949C38.305,29.431,44.5,22.934,44.5,15z M24.5,15c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S26.706,15,24.5,15z"/>
    </svg>
  </Div>;
};

export default PinIcon;
