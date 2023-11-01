import adminAxios from "./AxiosAdmin";

export const examApi = {

    getExams: (url) => {
        return adminAxios.get(url);
    },
}