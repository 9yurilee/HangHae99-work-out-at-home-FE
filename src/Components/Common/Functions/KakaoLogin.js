import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const { Kakao } = window;

export const LoginWithKakao = () => {
  const scope = 'profile_nickname';
  Kakao.Auth.loginForm({
    scope,
    persistAccessToken: true,
    success: function (response) {
      Kakao.Auth.setAccessToken(response.access_token);
      Kakao.API.request({
        url: '/v2/user/me',
        success: (response) => {
          const _id = response.id;
          const { profile } = response.kakao_account;
          axios
            .post('https://test.kimjeongho-server.com/users/auth', {
              nickName: profile.nickname,
              snsId: _id,
            })
            .then((res) => {
              localStorage.setItem('isLogin', res.data.token);
              const _nickname = jwt_decode(localStorage.getItem('isLogin')).nickName;

              window.alert(`반갑습니다 ${_nickname}님!😄`);
              window.location.reload('/');
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
  Kakao.Auth.logout();
  localStorage.clear();
  window.location.reload('/');
};

const KakaoLogin = () => {
  return (
    <>
      <a id="custom-login-btn" onClick={LoginWithKakao}>
        <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="250" />
      </a>
    </>
  );
};

export default KakaoLogin;
