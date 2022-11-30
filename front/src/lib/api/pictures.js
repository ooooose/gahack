import client from "./client";


export const getPictures = () => {
  return client.get("/pictures");
}

export const createPicture = (data) => {
  return client.post("/pictures", data);
}

export const deletePicture = (id) => {
  return client.delete(`/pictures/${id}`);
}