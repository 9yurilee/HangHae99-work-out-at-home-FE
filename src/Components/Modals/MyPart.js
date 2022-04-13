import React, { useState } from 'react';
import styled from 'styled-components';

import LoginWithKakao from '../Common/Functions/KakaoLogin';

import lock from './Images/Lock.svg';

const MyPart = () => {
  const is_local = localStorage.getItem('isLogin') ? true : false;

  return (
    <>
      {is_local ? (
        ''
      ) : (
        <DIV>
          <Container>
            <img src={lock} alt="자물쇠 아이콘" width="48" />
            <Text>로그인 후에 이용해주세요</Text>
            <LoginWithKakao />
          </Container>
        </DIV>
      )}
    </>
  );
};

const DIV = styled.div`
  width: 985px;
  height: 284px;
  background-color: rgba(34, 37, 41, 0.8);
  border-radius: 12px;
  position: absolute;
  left: 0px;
  z-index: 10;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Container = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  margin: 14px 0;
  color: #fff;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.72pt;
  font-weight: 500;
`;

export default MyPart;
