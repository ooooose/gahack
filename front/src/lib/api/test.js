import client from "lib/api/client"

export const execTest = () => client.get("/test")
