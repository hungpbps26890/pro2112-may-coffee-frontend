import axios from "./customized-axios";

export const fetchGetAllVouchers = () => axios.get("/api/vouchers");

export const fetchAllValidVouchers = () => axios.get("/api/vouchers/valid");

export const fetchGetVoucherById = (voucherId) =>
  axios.get("/api/vouchers/" + voucherId);
