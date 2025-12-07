import axios from "axios";

// Local URL (Use for development)
// const Api = axios.create({
//   baseURL: "http://localhost:5000/",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// Production URL (Use for live deployment)
const Api = axios.create({
  baseURL: "https://portfolio-server-35.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;