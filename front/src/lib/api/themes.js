import Cookies from "js-cookie";
import client from "./client";

export const getThemes = () => client.get("/themes", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  }})

export const showTheme = (id) => client.get(`/themes/${id}`, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
    }})