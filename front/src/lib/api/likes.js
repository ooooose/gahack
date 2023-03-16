import Cookies from 'js-cookie';
import client from './client';

export const createLike = (params) =>
  // パスがおそらくNG
  client.post('/likes', params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });

export const deleteLike = (id, params) =>
  client.delete(`/likes/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
    data: params,
  });
