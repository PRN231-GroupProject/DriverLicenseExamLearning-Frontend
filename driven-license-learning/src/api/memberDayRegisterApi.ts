import adminAxios from "./AxiosAdmin";

export const memberDayRegisterApi = {

    getMemberDayRegister: (url) => {
        return adminAxios.get(url);
    },


    postMemberDayRegisterApi: async (bookingId, dates: Date[]) => {
        const body = {
            dates : dates
        }
        console.log(body)
        try {
            const res = await adminAxios.post(`/memberDayRegister/${bookingId}`, body);
            console.log(res)
            return res;
        } catch (err) {
            throw err;
        }
    },

}