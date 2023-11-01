import adminAxios from "./AxiosAdmin";

export const transactionApi = {

    postTransaction: async (bookingId, transaction) => {
        console.log(transaction)
        try {
            const res = await adminAxios.post(`/transaction/${bookingId}`, transaction);
            console.log(res)
            return res;
        } catch (err) {
            throw err;
        }
    },

}