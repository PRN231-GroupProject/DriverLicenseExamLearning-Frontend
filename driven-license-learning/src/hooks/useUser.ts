'use client'
import useSWR from "swr";
import {userApi} from "@/api/userApi";
import AxiosAdmin from "@/api/AxiosAdmin";

export function useUser () {
    return {
        getMentors: () =>
            useSWR(`/user?$filter=roleId%20eq%203%20and%20status%20eq%20'Available'`, userApi.getUser),
    }
}