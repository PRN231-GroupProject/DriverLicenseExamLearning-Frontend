import adminAxios from "./AxiosAdmin";

export const mentorApi = {
    getBookingByMentorId: (url) => {
        return adminAxios.get(url);
    },

    getTrackingByBookingId: (url) => {
        return adminAxios.get(url);
    },

    getSalaryByMentorId: (url) => {
        return adminAxios.get(url);
    },

    postTrackingByBookingId: async (bookingId, note, processing) => {
        try {
            const data = {
                note: note,
                processing: processing
            }
            const res = await adminAxios.post(`/Tracking?bookingId=${bookingId}`, data)
            return res;
        } catch (err) {
            throw err;
        }
    }
}