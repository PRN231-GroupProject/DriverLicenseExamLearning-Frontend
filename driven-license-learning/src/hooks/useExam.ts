'use client'
import useSWR from "swr";
import AxiosAdmin from "@/api/AxiosAdmin";
import {licenseTypeApi} from "@/api/licenseTypeApi";
import {examApi} from "@/api/examApi";

export function useExam () {
    return {
        getExams: (id: bigint) =>
            useSWR(`/exam/GetQuizByMember?$filter=licenseId eq ${id}`, examApi.getExams),
    }
}