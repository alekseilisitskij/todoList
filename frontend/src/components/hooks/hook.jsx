import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
});

export const http = () => {
  const getAll = () => {
    return api.get("/api/clients");
  };

  const create = (data) => {
    return api.post("/api/clients", data);
  };

  const deleteData = (id) => {
    return api.delete(`/api/clients/${id}`);
  };

  const change = (id, data) => {
    console.log(id, data);
    return api.patch(`/api/clients/${id}`, data);
  };

  return { getAll, create, deleteData, change };
};
