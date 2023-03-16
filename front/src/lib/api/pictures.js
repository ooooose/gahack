import Cookies from 'js-cookie';
import client from './client';

export const getPictures = () =>
  client.get('/pictures', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });

export const createPicture = (params) =>
  client.post('/pictures', params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });

export const deletePicture = (id) =>
  client.delete(`/pictures/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });

export const showPicture = (id) =>
  client.get(`/pictures/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });

export const editPicture = (id, params) =>
  client.patch(`/pictures/${id}`, params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });

export const getBestPictures = () => client.get('/picture/best_pictures');
