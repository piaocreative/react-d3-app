import axios from "axios";

const axiosInstance = axios.create({
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  baseURL: process.env.REACT_APP_ESG_API_URL,
});

export function httpRequest() {
  return axiosInstance;
}
