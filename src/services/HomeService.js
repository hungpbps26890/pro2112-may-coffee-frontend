import axios from "./customized-axios";

export const getVouchers = async () => {
  return await axios.get("/api/vouchers");
};
