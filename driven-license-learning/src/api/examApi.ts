import adminAxios from "./AxiosAdmin";

export const examApi = {

    getExams: (url) => {
        return adminAxios.get(url);
    },

    postExam: async (exam) => {
        console.log(exam)
        try {
            const res = await adminAxios.post(`/exam/DoingQuiz`, exam);
            console.log(res)
            return res;
        } catch (err) {
            throw err;
        }
    },
}