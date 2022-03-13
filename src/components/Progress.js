import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from '@ramonak/react-progress-bar';
import styled from 'styled-components';
import { duration } from 'moment';
import { changeToSeconds } from './YoutubeDataAPI';

export default function Timer(props) {
  const videoLength = changeToSeconds(props.roomInfo.videoLength) - 2;

  const [text, setText] = useState('오늘도 운동하는 여러분👍🏻');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [progress, setProgress] = useState(0);
  const hour = parseInt(hours);
  const min = parseInt(minutes);
  const sec = parseInt(seconds);
  const progressBar = useRef();

  // JavaScript에 미디어쿼리를 사용하는 matchMedia()
  const NewMedia = window.matchMedia('screen and (max-width: 1360px)');
  // console.log(NewMedia.media);
  console.log('match는', NewMedia.matches);
  //찍힌다요~

  useEffect(() => {
    if (props.roomInfo.videoLength.length > 3) {
      let temp = props.roomInfo.videoLength.split(':');
      if (temp.length === 3) {
        setHours(temp[0]);
        setMinutes(temp[1]);
        setSeconds(temp[2]);
      } else {
        setMinutes(temp[0]);
        setSeconds(temp[1]);
      }
    }
  }, []);

  useEffect(() => {
    if (!props.isStart) return;
    const countdown = setInterval(() => {
      if (sec > 0) {
        setSeconds(sec - 1);
      }
      if (sec === 0) {
        if (min === 0) {
          if (hour === 0) {
            clearInterval(countdown);
          } else {
            setHours(hour - 1);
            setMinutes(59);
            setSeconds(59);
          }
        } else {
          if (hours === 0) {
            setMinutes(min - 1);
            setSeconds(59);
          } else {
            setMinutes(min - 1);
            setSeconds(59);
          }
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [hours, minutes, seconds, props.isStart]);

  useEffect(() => {
    if (!props.isStart) return;
    const pg = parseInt(progress);
    const myProgressBar = setInterval(() => {
      if (pg < videoLength) {
        setProgress(pg + 1);
      }
      if (pg >= videoLength * 0.25) {
        setText('화이팅!');
      }
      if (pg >= videoLength * 0.5) {
        setText('벌써 절반이나 왔어요!');
      }
      if (pg >= videoLength * 0.75) {
        setText('거의 다 왔습니다! 조금만 더 힘내요!');
      }
      if (pg === videoLength) {
        setText('👏🏻 오늘도 운동 완료! 다들 수고하셨습니다!');
        clearInterval(myProgressBar);
      }
    }, 1000);
    return () => clearInterval(myProgressBar);
  }, [progress, props.isStart]);

  return (
    <DIV>
      <Container className="App" style={{ color: 'black' }}>
        <div style={{ margin: '3px 0px 8px' }}>
          <TextWrap>{text}</TextWrap>
        </div>
        <Contents>
          <ProgressWrap>
            <ProgressBar ref={progressBar} completed={progress} isLabelVisible={false} maxCompleted={videoLength} width={NewMedia.matches ? 647 : 983} />
          </ProgressWrap>
          <TextWrap>
            {hours < 10 ? `0${hours}` : hours}:{String(minutes).length < 2 ? '0' + minutes : minutes}:{String(seconds).length < 2 ? '0' + seconds : seconds}
          </TextWrap>
        </Contents>
      </Container>
    </DIV>
  );
}

const DIV = styled.div``;
const Container = styled.div`
  @media screen and (max-width: 1360px) {
    width: 758px;
    height: 85px;
  }
`;

const Contents = styled.div`
  width: 1096px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1360px) {
    width: 758px;
    height: 50px;
  }
`;

const ProgressWrap = styled.div`
  /* @media screen and (max-width: 1360px) {
    width: 500px;
  } */
`;

const TextWrap = styled.div`
  font-size: 25px;
  font-weight: 500;
  color: rgb(34, 37, 41);
`;
