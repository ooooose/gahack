import Cookies from 'js-cookie';
import client from './client';

export const createComment = (params, pictureId) =>
  client.post(`/pictures/${pictureId}/comments`, params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });

export const deleteComment = (pictureId, id) =>
  client.delete(`/pictures/${pictureId}/comments/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
