'use client'
import {selectUser, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from "@/redux/features/userSlice";
import {AppDispatch} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import {useBooking} from "@/hooks/useBooking";
import React, {useEffect, useState} from "react";
import {BookingBox} from "@/components/HistoryBooking/BookingBox";
import {
    Button,
    Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup, Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip, useDisclosure
} from "@nextui-org/react";
import { IconReceiptRefund , IconEye } from '@tabler/icons-react';
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {useForm} from "react-hook-form";
import {userApi} from "@/api/userApi";
import {toast} from "react-toastify";
import {transactionApi} from "@/api/transactionApi";
import {useRouter} from "next/navigation";

export default function HistoryBookingPage() {

    const [ bookingId, setBookingId] = useState<number>(0)

    const router = useRouter()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const form = useForm();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    const notify = React.useCallback((message,type) => {
        toast[type](message,{
            position: "top-right",
            autoClose: 5000,// Set it to false directly
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    }, []);

    const handleRefund = () => {
        console.log(bookingId);
        const fetchRefund = async () => {
            try {
                await transactionApi.refund(bookingId)
                    .then((r) => {
                        notify(r.msg,'success');
                    })
            } catch (error) {
                console.log(error.response.data);
                notify("Fail",'error');
            }
        };
        fetchRefund();
    };

    const user = useSelector(selectUser);
    const dispatch = useDispatch<AppDispatch>();
    const { getBookingByEmail } = useBooking();
    const {data: bookings, isLoading, error} = getBookingByEmail(user.userAccountInfor?.email);
    console.log(bookings)

    const columns= [
        {name: "BookingId", uid: "BookingId"},
        {name: "CreateDate", uid: "CreateDate"},
        {name: "Mentor", uid: "Mentor"},
        {name: "Package", uid: "Package"},
        {name: "Status", uid: "Status"},
        {name: "Actions", uid: "Actions"},
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
            case "Actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <button onClick={() => {
                                    router.push(`/historyBooking/${booking.BookingId}`)
                                }}>
                                    <IconEye />
                                </button>
                            </span>
                        </Tooltip>
                        <Tooltip content="Refund">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <button onClick={() => {
                                    setBookingId(booking.BookingId)
                                    onOpen()
                                }}>
                                    <IconReceiptRefund/>
                                </button>
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    if (isLoading) {
        return (
            <div className='content-center text-center mt-6'>
                <Spinner className='mt-6' />
            </div>
        )
    }

    if (error) {
        return (
            <div className='content-center text-center mt-6'>
                Not found history
            </div>
        )
    }

    return (
        <>
            <div className='w-4/5 mx-auto mt-3 mb-3'>
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
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent className='h-[180px] w-[500px]'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Choose Date Learning</ModalHeader>
                                <ModalBody className='text-center'>
                                    <p>Do you want to refund this package? </p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onClick={() => {
                                        handleRefund();
                                        onClose()
                                    }}>
                                        Confirm
                                    </Button>
                                </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}