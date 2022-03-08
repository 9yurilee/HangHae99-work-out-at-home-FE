import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ActionCreators as userActions } from '../redux/modules/User';
// import jwt from 'jsonwebtoken';
import { history } from '../redux/configureStore';
// import setAuthorizationToken from '../shared/Request';

const { Kakao } = window;

const LoginWithKakao = () => {
  //scope : 수집할 사용자 정보를 명시.
  const scope = 'profile_nickname';

  // Kakao.Auth.login는 인증에 성공하면 success call back이 실행된다.
  Kakao.Auth.login({
    scope,
    // success는 인증 정보를 응답(response)으로 받는다.
    success: function (response) {
      //카카오 SDK에 사용자 토큰을 설정한다.
      window.Kakao.Auth.setAccessToken(response.access_token);
      const ACCESS_TOKEN = window.Kakao.Auth.getAccessToken();
      // console.log(ACCESS_TOKEN); //토큰 발급 완료
      // 사용자 정보 불러오기
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (response) => {
          const _id = response.id;
          const { profile } = response.kakao_account;

          axios
            .post('http://3.39.58.56:4000/users/auth', {
              nickName: profile.nickname,
              snsId: _id,
            })
            .then((res) => {
              console.log(res);
              localStorage.setItem('isLogin', res.data.token);
              // dispatch(userActions.getNickname(profile.nickname));
              // window.alert(`반갑습니다 ${profile.nickname}님!😄`);
              // window.location.replace('/');
              // setAuthorizationToken(res.data.token);
              // console.log(jwt.decode(res.data.token));
            })
            .catch((error) => {
              alert('카카오 로그인 에러', error.message);
            });
        },
        fail: function (error) {
          console.log(error);
        },
      });
    },
    fail: function (err) {
      console.log(err);
    },
  });
};

export const logoutWithKakao = () => {
  if (!Kakao.Auth.getAccessToken()) {
    console.log('로그인되어 있지 않습니다.');
    return;
  }
  Kakao.Auth.logout();
  localStorage.clear();
};

const KakaoLogin = () => {
  return (
    <>
      <a id="custom-login-btn" onClick={LoginWithKakao}>
        <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="250" />
      </a>
      {/* <button onClick={logoutWithKakao}>로그아웃!!!!!!!!!</button> */}
    </>
  );
};

export default KakaoLogin;
