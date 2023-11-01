'use client'
import {selectUser} from "@/redux/features/userSlice";
import {AppDispatch} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import {useBooking} from "@/hooks/useBooking";
import React from "react";
import {BookingBox} from "@/components/HistoryBooking/BookingBox";
import {Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip} from "@nextui-org/react";

export default function HistoryBookingPage() {

    const user = useSelector(selectUser);
    const dispatch = useDispatch<AppDispatch>();
    const { getBookingByEmail } = useBooking();
    const {data: packages, error} = getBookingByEmail(user.userAccountInfor.email);
    console.log(packages)

    const columns = [
        {name: "BookingId", uid: "BookingId"},
        {name: "CreateDate", uid: "CreateDate"},
        {name: "Status", uid: "Status"},
    ];

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = packages[columnKey];

        switch (columnKey) {
            case "BookingId":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.BookingId}</p>
                    </div>
                );
            case "CreateDate":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                        <p className="text-bold text-sm capitalize text-default-400">{user.CreateDate}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color='red' size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                {packages!=undefined&&
                    <TableBody items={packages}>
                        {(item) => (
                            <TableRow key={item.CreateDate}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                }

            </Table>
        </>
    )
}