'use client'
import useSWR from "swr";
import {memberDayRegisterApi} from "@/api/memberDayRegisterApi";

export function useMemberDayRegister () {
    return {
        getMemberDayRegister: (id: bigint) =>
            useSWR(`/MemberDayRegister/${id}`, memberDayRegisterApi.getMemberDayRegister),
    }
}