import axios from "axios";
import {getTokenDataFromLocalStorage} from "@/utils/serverUtils";

const adminAxios = axios.create({
    baseURL: "https://www.driverlicenseexamlearning.somee.com/api",
    //baseURL: "https://localhost:7199/api",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8"
        // Accept: "*/*",
        // "Content-Type": "text/html; charset=UTF-8",
        // "Content-Type": "multipart/form-data; boundary=something",
    },
});
adminAxios.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = "Bearer " + getTokenDataFromLocalStorage();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

adminAxios.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        console.log(error.response.status);

        if (error.response.status === 401) {
        }
        throw error;
    }
);
export default adminAxios;
