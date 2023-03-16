import Cookies from "js-cookie";
import client from "./client";

export const showUser = (id) => client.get(`/users/${id}`, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
    }})

export const editUser = (id, params) => client.patch(`/users/${id}`, params, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid"),
    }})

export const getBestUsers = () => client.get("/user/best_users")