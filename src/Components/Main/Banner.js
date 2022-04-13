import React from 'react';
import styled from 'styled-components';

import banner1 from './Images/Banner_1.png';
import banner2 from './Images/Banner_2.png';

const Banner = () => {
  const isLogin = localStorage.getItem('isLogin');

  const [bannerIndex, setBannerIndex] = React.useState(0);

  const circleArray = [0, 0];

  const clickPrev = () => {
    if (bannerIndex <= 0) {
      setBannerIndex(circleArray.length - 1);
      return;
    }
    setBannerIndex(bannerIndex - 1);
  };

  const clickNext = () => {
    if (bannerIndex >= circleArray.length - 1) {
      setBannerIndex(0);
      return;
    }
    setBannerIndex(bannerIndex + 1);
  };

  const clickCircle = (i) => {
    setBannerIndex(i);
  };

  React.useEffect(() => {
    const slider = setInterval(() => setBannerIndex((value) => (value === circleArray.length - 1 ? 0 : value + 1)), 5000);
    return () => clearInterval(slider);
  }, []);

  return (
    <Container>
      <Carousel bannerIndex={bannerIndex}>
        {circleArray.map((e, i) => (
          <ContentBox style={{ display: 'flex' }} index={i} key={i}>
            {bannerIndex === 1 ? (
              <img
                src={banner1}
                alt="오류제보 배너"
                width="315px"
                onClick={() => {
                  isLogin ? window.open('https://forms.gle/ympKY1rVpspLX1Ut8') : window.alert('로그인 후 이용가능합니다');
                }}
              />
            ) : (
              <img
                src={banner2}
                alt="사용후기 배너"
                width="315px"
                onClick={() => {
                  isLogin ? window.open('https://forms.gle/Shna39cfEnXqkLfu6') : window.alert('로그인 후 이용가능합니다');
                }}
              />
            )}
          </ContentBox>
        ))}
      </Carousel>
      <CircleBox>
        {circleArray.map((e, i) => (
          <Circle
            key={i}
            onClick={() => {
              clickCircle(i);
            }}
            style={{
              width: i === bannerIndex ? '32px' : null,
              borderRadius: i === bannerIndex ? '12px' : null,
              transition: 'width 0.1s',
            }}
          />
        ))}
      </CircleBox>
    </Container>
  );
};

// 컨테이너에서 화살표색, 배경색 지정
const Container = styled.div`
  width: 315px;
  height: 136px;
  font-size: 34px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #e9e9e9;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  overflow-x: hidden;
`;

const Carousel = styled.div`
  display: flex;
  transform: translate(
    ${(props) => {
      return -(props.bannerIndex * 315) + 'px';
    }}
  );
`;

const ContentBox = styled.div`
  font-size: 22px;
  width: 315px;
  height: 136px;
  font-weight: 700;
  line-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 12px;
  cursor: pointer;
`;

const CircleBox = styled.div`
  width: auto;
  display: flex;
  position: absolute;
  bottom: 7%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Circle = styled.div`
  width: 8px;
  height: 8px;
  background: #353a3f;
  border-radius: 100%;
  margin: 0px 5px;
  cursor: pointer;
`;

export default Banner;
