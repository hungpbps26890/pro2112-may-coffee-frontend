import axios from "./customized-axios";

export const postPaymentMethodBank = (data) =>
  axios.post("/api/payment-method-banks", data);
