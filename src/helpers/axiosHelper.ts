import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7000",
  headers: {
    "Content-Type": "application/json",
  },
});

if (typeof window != "undefined") {
  let token = localStorage.getItem("token");
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export default instance;
