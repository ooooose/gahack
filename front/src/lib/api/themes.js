import client from "./client";
import Cookies from "js-cookie";

export const getThemes = () => {
  return client.get("/themes", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  }});
}

export const showTheme = (id) => {
  return client.get(`/themes/${id}`, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
    }});
}