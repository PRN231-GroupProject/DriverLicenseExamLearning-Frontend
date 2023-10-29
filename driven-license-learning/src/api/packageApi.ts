import adminAxios from "./AxiosAdmin";

export const packageApi = {

    getPackage: (url) => {
        return adminAxios.get(url);
    },

}