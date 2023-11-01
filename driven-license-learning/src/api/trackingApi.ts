import adminAxios from "./AxiosAdmin";

export const trackingApi = {

    getTracking: (url) => {
        return adminAxios.get(url);
    },


    postTracking: async (trackingId, tracking) => {
        console.log(tracking)
        try {
            const res = await adminAxios.post(`/Tracking/${trackingId}`, tracking);
            console.log(res)
            return res;
        } catch (err) {
            throw err;
        }
    },

}