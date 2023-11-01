'use client'
import useSWR from "swr";
import {carApi} from "@/api/carApi";
import AxiosAdmin from "@/api/AxiosAdmin";

export function useCar () {
    return {
        getCars: () =>
            useSWR("/car?$filter=status%20eq%20'Active'", carApi.getCar),
    }
}