import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Api;

// Production URL (Uncomment when deploying)
// const Api = axios.create({
//   baseURL: "https://portfolio-server-35.onrender.com",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });