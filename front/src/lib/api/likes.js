import client from "./client";
import Cookies from "js-cookie";

export const createLike = (params) => {
  // パスがおそらくNG
  return client.post("/likes", params, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  }});
}

export const deleteLike = (id, params) => {
  return client.delete(`/likes/${id}`,
  { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  },
    data: params
  });
}