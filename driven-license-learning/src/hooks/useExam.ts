'use client'
import useSWR from "swr";
import AxiosAdmin from "@/api/AxiosAdmin";
import {licenseTypeApi} from "@/api/licenseTypeApi";
import {examApi} from "@/api/examApi";

export function useExam () {
    return {
        getExams: (id: bigint) =>
            useSWR(`/exam/GetQuizByMember?$filter=licenseId eq ${id}&$expand=exams($filter=examId eq 1;$expand=questions)`
                , examApi.getExams),

        getExamFilter: (licenseId: number, examId: number) =>
            useSWR(
                licenseId===0?``
                    :
                    examId===0?`/exam/GetQuizByMember?$filter=licenseId eq ${licenseId}`
                        :`/exam/GetQuizByMember?$filter=licenseId eq ${licenseId}&$expand=exams($filter=examId eq ${examId};$expand=questions)`
                , examApi.getExams),

        getExamHistoryFilter: (licenseId: number) =>
            useSWR(
                licenseId===0?``
                    :
                    `/exam/QuizHistory?licenseTypeID=${licenseId}`
                , examApi.getExams),

        getExamHistoryDetailFilter: (examresultId: number) =>
            useSWR(`/exam/QuizHistoryDetail?examresultId=${examresultId}`
                , examApi.getExams),
    }
}