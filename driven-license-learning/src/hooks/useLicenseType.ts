'use client'
import useSWR from "swr";
import AxiosAdmin from "@/api/AxiosAdmin";
import {licenseTypeApi} from "@/api/licenseTypeApi";

export function useLicenseType () {
    return {
        getLicenseTypes: () =>
            useSWR(`/license-type`, licenseTypeApi.getLicenseType),
    }
}