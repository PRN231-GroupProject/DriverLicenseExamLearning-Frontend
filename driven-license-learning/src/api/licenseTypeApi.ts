import adminAxios from "./AxiosAdmin";

export const licenseTypeApi = {

    getLicenseType: (url) => {
        return adminAxios.get(url);
    },
}