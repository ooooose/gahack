import client from "./client";
import Cookies from "js-cookie";

export const showUser = (id) => {
  return client.get(`/users/${id}`, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
    }});
}

export const editUser = (id, params) => {
  return client.patch(`/users/${id}`, params, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
    }});
}