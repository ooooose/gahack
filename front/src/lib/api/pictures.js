import client from "./client";
import Cookies from "js-cookie";

export const getPictures = () => {
  return client.get("/pictures", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  }});
}

export const createPicture = (params) => {
  return client.post("/pictures", params, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  }});
};

export const deletePicture = (id) => {
  return client.delete(`/pictures/${id}`,
  { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  }})
}

export const showPicture = (id) => {
  return client.get(`/pictures/${id}`,{ headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  }});
}