import axios from "axios";

const { VITE_BASE_URL } = import.meta.env;

const client = axios.create({ baseURL: VITE_BASE_URL + "/api/v1" });

export default client;
