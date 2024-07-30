import axios from "./customized-axios";

export const postView = (data) => axios.post("/api/reviews", data);
