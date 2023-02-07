import client from "./client";
import Cookies from "js-cookie";

export const createRelationship = (userId, params) => {
  return client.post(`users/${userId}/relationships`, params, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  }});
}

export const destroyRelationship = (userId, id, params) => {
  return client.delete(`users/${userId}/relationships/${id}`,
  { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  },
    data: params
  });
}