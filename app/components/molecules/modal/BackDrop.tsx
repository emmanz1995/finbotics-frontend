'use client';

import React from 'react';
import styled from 'styled-components';

const BackDrop = ({ children }: any) => {
  return <StyledBackDrop>{children}</StyledBackDrop>;
};

const StyledBackDrop = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  background: rgb(0 0 0 / 0.5);
  z-index: 1;
  opacity: 1;
`;

export default BackDrop;
