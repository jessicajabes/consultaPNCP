import axios from "axios";

const api = axios.create({
    baseURL: "https://pncp.gov.br/api/consulta/"
});

export default api;