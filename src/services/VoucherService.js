import axios from "./customized-axios";

export const fetchGetAllVouchers = () => axios.get("/api/vouchers");

export const fetchGetVoucherById = (voucherId) =>
  axios.get("/api/vouchers/" + voucherId);
