'use client'
import {useTracking} from "@/hooks/useTracking";
import {
    Button,
    Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip, useDisclosure
} from "@nextui-org/react";
import { IconReceiptRefund , IconEye } from '@tabler/icons-react';
import React, {useState} from "react";
import {useRouter} from "next/navigation";

export interface Tracking {
    trackingId:   number;
    bookingId:    number;
    trackingDate: Date;
    note:         string;
    processing:   number;
    status:       string;
    total:        number;
    type:         string;
    booking:      null;
}

export interface Columns {
    name: string;
    uid:  string;
}

export default function HistoryTrackingPage({ params }: { params: { bookingId: number } }) {

    const [selectedTracking, setSelectedTracking] = useState<Partial<Tracking>>({})

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const router = useRouter()

    const {getTrackingsByBookingId} = useTracking()
    const {data: trackings, isLoading, error } = getTrackingsByBookingId(params.bookingId)

    const columns= [
        {name: "Tracking Id", uid: "trackingId"},
        {name: "Tracking Date", uid: "trackingDate"},
        {name: "Note", uid: "note"},
        {name: "Processing", uid: "processing"},
        {name: "Status", uid: "status"},
        {name: "Total", uid: "total"},
        {name: "Type", uid: "type"},
        {name: "Actions", uid: "Actions"},
    ];

    const renderCell = React.useCallback((tracking, columnKey) => {
        const cellValue = tracking[columnKey];
        switch (columnKey) {
            case "trackingId":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "trackingDate":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "note":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "total":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "type":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "processing":
                return (
                    <Chip className="capitalize" color={cellValue==1?`success`:`danger`} size="sm" >
                        {cellValue==1?"Processing":"Not Processing"}
                    </Chip>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={cellValue=="Active"?`primary`:`danger`} size="sm" >
                        {cellValue}
                    </Chip>
                );
            case "Actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <button onClick={() => {
                                    setSelectedTracking(tracking)
                                    onOpen()
                                    // router.push(`/historyBooking/${trackings.trackingId}`)
                                }}>
                                    <IconEye />
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
                Not found tracking detail
            </div>
        )
    }

    return (
        <>
            <div className='w-4/5 mx-auto mt-3 mb-3'>
                <div className='text-center mb-3 font-semibold text-2xl'>
                    Tracking Details
                </div>
                <Table aria-label="Example table with custom cells">
                    <TableHeader columns={columns as any}>
                        {(column) => (
                            <TableColumn key={column.uid}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={trackings as Tracking[]} emptyContent={"No rows to display."}>
                        {(item) => (
                            <TableRow key={item.trackingId}>
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
                <ModalContent className='h-[450px] w-[500px]'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Tracking Detail</ModalHeader>
                            <ModalBody className='ml-7 mt-6'>
                                <div className='grid grid-cols-2'>
                                    <div className='col-span-1 font-semibold'>Tracking ID:</div>
                                    <div className='font-medium'>{selectedTracking.trackingId}</div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className='font-semibold'>Booking ID:</div>
                                    <div className='font-medium'>{selectedTracking.bookingId} </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className='font-semibold'>Tracking Date:</div>
                                    <div className='font-medium'>{selectedTracking.trackingDate}</div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className='font-semibold'>Note:</div>
                                    <div className='font-medium'>{selectedTracking.note} </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className='font-semibold'>Processing:</div>
                                    <Chip className="capitalize" color={selectedTracking.processing==1?`success`:`danger`} size="sm" >
                                        {selectedTracking.processing==1?"Processing":"Not Processing"}
                                    </Chip>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className='font-semibold'>Status:</div>
                                    <Chip className="capitalize" color={selectedTracking.status=="Active"?`primary`:`danger`} size="sm" >
                                        {selectedTracking.status}
                                    </Chip>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className='font-semibold'>Total:</div>
                                    <div className='font-medium'>{selectedTracking.total} VND</div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <div className='font-semibold'>Type:</div>
                                    <div className='font-medium'>{selectedTracking.type} </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}