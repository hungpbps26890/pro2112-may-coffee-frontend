import axios from "./customized-axios";

export const fetchGetAllReview = () => axios.get("/api/reviews");
export const postView = (data) => axios.post("/api/reviews", data);
