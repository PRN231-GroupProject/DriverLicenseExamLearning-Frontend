'use client'
import { mentorApi } from "@/api/mentorApi"
import useSWR from "swr"

export function useMentor() {
    return {
        getBookingByMentorId: (id: number) => 
            useSWR(`/booking?$filter=mentor/any(m: m/UserId eq ${id})`, mentorApi.getBookingByMentorId),

        getTrackingByBookingId: (id: number) =>
            useSWR(`/tracking?$filter=bookingId eq ${id}`, mentorApi.getTrackingByBookingId),

        getSalaryByMentorId: (id: number) =>
            useSWR(`/transaction?filter=userId eq ${id}`, mentorApi.getSalaryByMentorId),
    }
}