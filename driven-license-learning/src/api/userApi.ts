import adminAxios from "./AxiosAdmin";

export const userApi = {

    getUser: (url) => {
        return adminAxios.get(url);
    },

    login: async (account) => {
        try {
            const res = await adminAxios.post(`/user/login`, account);
            var check = localStorage.setItem('userData', JSON.stringify(res))
            console.log(check)
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

    registerMentor: async (account) => {
        try {
            console.log(account);
            const res = await adminAxios.post(
                `/user/mentor-regiser`,
                account,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
                );
            return res;
        } catch (err) {
            throw err;
        }
    },
}