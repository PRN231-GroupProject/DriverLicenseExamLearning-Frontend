'use client'
import useSWR from "swr";
import AxiosAdmin from "@/api/AxiosAdmin";
import {bookingApi} from "@/api/bookingApi";

export function useBooking () {
    return {
        getBookings: () =>
            useSWR("/booking", bookingApi.getBooking),

        getBookingById: (id: number) =>
            useSWR(`/booking?$filter=bookingId eq ${id}`, bookingApi.getBooking),

        getBookingByEmail: (email: string) =>
            useSWR(`/booking?$filter=member/any(member: member/email eq '${email}')&$expand=mentor,package`
                , bookingApi.getBooking),
    }
}