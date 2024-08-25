import axios from "./customized-axios";

export const postCreateOrder = (data) => axios.post("/api/orders", data);

export const putCreateOrder = (data) =>
  axios.put("/api/orders/order/update-status", data);

export const fetchGetOrdersByUser = () => axios.get("/api/orders/user");

export const fetchGetOrderById = (id) => axios.get(`/api/orders/${id}`);
