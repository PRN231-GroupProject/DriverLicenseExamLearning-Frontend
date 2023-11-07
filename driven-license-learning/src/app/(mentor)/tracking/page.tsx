'use client'
import BookingCard from "@/components/MentorPage/BookingCard";
import { useMentor } from "@/hooks/useMentor";
import React, { useEffect, useState } from "react";

export default function TrackingPage() {
    const [mentorId, setMentorId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await localStorage.getItem('userData');
                const jsondata = JSON.parse(data);
                const userId = jsondata.userId;
                setMentorId(userId);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const { getBookingByMentorId, getTrackingByBookingId, getSalaryByMentorId } = useMentor();
    const { data:booking, error } = getBookingByMentorId(mentorId);
    const { data: salary } =  getSalaryByMentorId(mentorId);
    // const { data: tracking} = getTrackingByBookingId(bookingId);
    
    console.log(booking)
    return (
        <div className="grid grid-cols-5">
            {booking?.map((r, index) =>
            <div key={index}>
                <BookingCard
                    bookingId = {r.bookingId}
                    car = {r.car}
                    member = {r.member}
                    bookingPackage = {r.package}
                    status = {r.status}
                ></BookingCard>
            </div>
            )}
        </div>
    )
}