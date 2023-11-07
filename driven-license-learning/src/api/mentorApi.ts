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

}