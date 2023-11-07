import adminAxios from "./AxiosAdmin";

export const transactionApi = {

    getTransaction: (url) => {
        return adminAxios.get(url);
    },
    postTransaction: async (bookingId) => {
        console.log(bookingId)
        try {
            const res = await adminAxios.post(`/Transaction/transaction?bookingId=${bookingId}`,'{}');
            console.log(res)
            return res;
        } catch (err) {
            throw err;
        }
    },

    refund: async (bookingId) => {
        console.log(bookingId)
        try {
            const res = await adminAxios.post(`/Transaction/refund?bookingId=${bookingId}`,'{}');
            console.log(res)
            return res;
        } catch (err) {
            throw err;
        }
    },

}