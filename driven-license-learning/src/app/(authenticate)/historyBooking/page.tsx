'use client'
import {selectUser} from "@/redux/features/userSlice";
import {AppDispatch} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import {useBooking} from "@/hooks/useBooking";
import React, {useEffect, useState} from "react";
import {BookingBox} from "@/components/HistoryBooking/BookingBox";
import {Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip} from "@nextui-org/react";

export default function HistoryBookingPage() {

    const user = useSelector(selectUser);
    const dispatch = useDispatch<AppDispatch>();
    const { getBookingByEmail } = useBooking();
    const {data: bookings, isLoading} = getBookingByEmail(user.userAccountInfor?.email);
    console.log(bookings)

    const columns = [
        {name: "BookingId", uid: "BookingId"},
        {name: "CreateDate", uid: "CreateDate"},
        {name: "Mentor", uid: "Mentor"},
        {name: "Package", uid: "Package"},
        {name: "Status", uid: "Status"},
    ];

    const renderCell = React.useCallback((booking, columnKey) => {
        const cellValue = booking[columnKey];
        switch (columnKey) {
            case "BookingId":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "CreateDate":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "Mentor":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue[0].UserName}</p>
                    </div>
                );
            case "Package":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue[0].PackageName}</p>
                    </div>
                );
            case "Status":
                return (
                    <Chip className="capitalize" color='danger' size="sm" >
                        {cellValue}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, []);

    if (isLoading) {
        return <div>Loading data...</div>
    }

    return (
        <>
            <div className='w-3/5 mx-auto mt-3 mb-3'>
                <div className='text-center mb-3 font-semibold text-2xl'>
                    My Bookings History
                </div>
                <Table aria-label="Example table with custom cells">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={bookings} emptyContent={"No rows to display."}>
                        {(item) => (
                            <TableRow key={item.BookingId}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}