import adminAxios from "./AxiosAdmin";

export const transactionApi = {

    postTransaction: async (bookingId, transaction) => {
        console.log(transaction)
        try {
            const res = await adminAxios.post(`/Transaction/transaction?bookingId=${bookingId}`,'{}');
            console.log(res)
            return res;
        } catch (err) {
            throw err;
        }
    },

}