'use client'
import useSWR from "swr";
import AxiosAdmin from "@/api/AxiosAdmin";
import {trackingApi} from "@/api/trackingApi";

export function useTracking () {
    return {
        getTrackings: () =>
            useSWR("/Tracking", trackingApi.getTracking),

        getTrackingsByBookingId: (bookingId: number) =>
            useSWR(`/Tracking?$filter=bookingId eq ${bookingId}`, trackingApi.getTracking),
    }
}