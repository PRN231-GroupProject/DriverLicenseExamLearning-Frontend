import adminAxios from "./AxiosAdmin";

export const licenseTypeApi = {

    getLicenseType: (url) => {
        return adminAxios.get(url);
    },

    getLicenseApplicationByCustomer: (url) => {
        return adminAxios.get(url);
    },

    sendLicenseApplication: async (licenseTypeID: number, body: object) => {
        try {
            console.log(body);
            const res = await adminAxios.post(
                `/license_application/Submit?licenseTypeID=${licenseTypeID}`,
                body,
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