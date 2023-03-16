import Cookies from "js-cookie";
import client from "./client";

export const createBookmark = (params) => client.post("/bookmarks", params, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  }})

export const deleteBookmark = (id, params) => client.delete(`/bookmarks/${id}`,
  { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  },
    data: params
  })
