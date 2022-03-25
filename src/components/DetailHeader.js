import React, { useState } from "react";
import styled from "styled-components";

import ExitModal from "../components/modals/ExitModal";
import People from "../Images/People.png";
import Logo from "../Images/Logo_only.svg";
import CopyLink from "../Images/CopyLink.png";

import { history } from "../redux/configureStore";
const Header = (props) => {
  const { roomTitle, roomId } = props.roomInfo;
  const { isDone } = props;
  const [modalOn, setModalOn] = React.useState(false);
  console.log("디테일헤더");
  const exitRoom = () => {
    setModalOn(!modalOn);
  };

  // const { Kakao } = window;

  const copyLink = () => {
    let url;
    let textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("URL이 복사되었습니다.");
  };

  return (
    <HeaderContainer>
      <HeaderGrid>
        <RoomTitle>
          <img
            src={Logo}
            alt="홈트게더 로고"
            style={{ height: "32px", marginRight: "12px" }}
          />
          {roomTitle}
          <img
            src={CopyLink}
            alt="링크공유"
            onClick={copyLink}
            style={{ cursor: "pointer" }}
          />
        </RoomTitle>
        <BtnWrap>
          {/* 나가기 */}
          <HeaderBtn onClick={exitRoom}>
            <BtnContents style={{ color: "#aeb5bc" }}>나가기</BtnContents>
            {modalOn && (
              <ExitModal roomId={roomId} isDone={isDone} exitRoom={exitRoom} />
            )}
          </HeaderBtn>
          {/*  인원수*/}
          <HeaderBtn>
            <BtnContents>
              <img src={People} alt="인원수" />
              <div style={{ color: "#aeb5bc" }}>{props.numberOfUsers}</div>
            </BtnContents>
          </HeaderBtn>
        </BtnWrap>
      </HeaderGrid>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #eaecef;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  position: absolute;
  width: 100vw;
`;
const HeaderGrid = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1320px;
  & > p {
    color: #4a5056;
    font-size: 20px;
    font-weight: bold;
  }
  @media screen and (max-width: 1440px) {
    width: 980px;
  }
`;

const RoomTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #878e95;
`;

const BtnWrap = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  position: relative;
  flex-direction: row-reverse;
`;
const HeaderBtn = styled.div`
  width: 92px;
  height: 40px;
  border: 1px solid #aeb5bc;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
`;

const BtnContents = styled.div`
  width: 92px;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  vertical-align: middle;
`;
export default React.memo(Header);
