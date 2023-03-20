import Cookies from 'js-cookie';
import client from './client';

// サインアップ
export const signUp = (params) => client.post('/auth', params);

// サインイン
export const signIn = (params) => client.post('/auth/sign_in', params);

// ゲストログイン
export const guestSignIn = () => client.post('/auth/guest_sign_in');

// サインアウト
export const signOut = () =>
  client.delete('/auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });

export const passwordReset = (data) => client.post('auth/password', data);

export const editPassword = (data, params) =>
  client.put('auth/password', data, {
    headers: {
      'access-token': params.get('access-token'),
      client: params.get('client'),
      uid: params.get('uid'),
    },
  });

// 認証済みユーザーの取得
export const getCurrentUser = () => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  )
    return;

  return client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};
