'use client'
import useSWR from "swr";
import {packageApi} from "@/api/packageApi";
import AxiosAdmin from "@/api/AxiosAdmin";

export function usePackage () {
    return {
        getPackages: () =>
            useSWR("/package", packageApi.getPackage),

        getPackageById: (id: bigint) =>
            useSWR(`/package?$filter=packageId%20eq%20${id}`, packageApi.getPackage)
    }
}