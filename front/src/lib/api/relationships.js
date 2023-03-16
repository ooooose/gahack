import Cookies from 'js-cookie';
import client from './client';

export const createRelationship = (userId, params) =>
  client.post(`users/${userId}/relationships`, params, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });

export const destroyRelationship = (userId, id, params) =>
  client.delete(`users/${userId}/relationships/${id}`, {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
    data: params,
  });
