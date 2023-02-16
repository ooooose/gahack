import client from "./client";
import Cookies from "js-cookie";

export const createBookmark = (params) => {
  return client.post("/bookmarks", params, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  }});
}

export const deleteBookmark = (id, params) => {
  return client.delete(`/bookmarks/${id}`,
  { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  },
    data: params
  });
}
