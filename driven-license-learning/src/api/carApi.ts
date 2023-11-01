import adminAxios from "./AxiosAdmin";

export const carApi = {

    getCar: (url) => {
        return adminAxios.get(url);
    },
}