import client from "./client";
import Cookies from "js-cookie";

export const createComment = (params, pictureId) => {
  return client.post(`/pictures/${pictureId}/comments`, params, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  }});
};

export const deleteComment = (pictureId, id) => {
  return client.delete(`/pictures/${pictureId}/comments/${id}`,
  { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
  }})
}