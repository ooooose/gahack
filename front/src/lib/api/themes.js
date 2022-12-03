import client from "./client";


export const getThemes = () => {
  return client.get("/themes");
}

export const showTheme = (id) => {
  return client.get(`/themes/${id}`);
}