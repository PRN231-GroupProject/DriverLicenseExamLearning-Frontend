import adminAxios from "./AxiosAdmin";

export const userApi = {

    login: async (account) => {
        try {
            const res = await adminAxios.post(`/user/login`, account);
            console.log(res)
            return res;
        } catch (err) {
            throw err;
        }
    },

    register: async (account) => {
        try {
            console.log(account);
            const res = await adminAxios.post(`/user/register`, account);
            return res;
        } catch (err) {
            throw err;
        }
    },
}