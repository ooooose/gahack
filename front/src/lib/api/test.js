import client from "lib/api/client"

export const execTest = () => {
  return client.get("/test");
}
