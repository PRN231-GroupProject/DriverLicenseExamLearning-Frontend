import adminAxios from "./AxiosAdmin";

export const bookingApi = {

    getBooking: (url) => {
        return adminAxios.get(url);
    },

    postBooking: async (booking) => {
        try {
            const res = await adminAxios.post(`/booking`, booking);
            console.log(res)
            return res;
        } catch (err) {
            throw err;
        }
    },

    putBooking: async (booking) => {
        try {
            console.log(booking);
            const res = await adminAxios.put(`/booking`, booking);
            return res;
        } catch (err) {
            throw err;
        }
    },
}