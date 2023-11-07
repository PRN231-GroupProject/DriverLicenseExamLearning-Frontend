'use client'
import {selectUser} from "@/redux/features/userSlice";
import {AppDispatch} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {
    Button,
    Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip, useDisclosure
} from "@nextui-org/react";
import { IconEye } from '@tabler/icons-react';
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";
import {useTransaction} from "@/hooks/useTransaction";


export interface Transaction {
    transactionId: number
    bookingId: number;
    userId: number;
    total:  bigint;
    status: string;
    transactionType: string;
}

export default function HistoryTransactionPage() {

    const [ selectedTransaction, setSelectedTransaction ] = useState<Transaction>()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const form = useForm();

    const {
        formState: { errors },
    } = form;

    const user = useSelector(selectUser);
    const { getTransactions } = useTransaction();
    const {data: transactions, isLoading, error} = getTransactions(user.userAccountInfor?.userId);
    console.log(transactions)
    const columns= [
        {name: "Transaction Id", uid: "transactionId"},
        {name: "Booking Id", uid: "bookingId"},
        {name: "Total", uid: "total"},
        {name: "Status", uid: "status"},
        {name: "Transaction Type", uid: "transactionType"},
        {name: "Actions", uid: "Actions"},
    ];

    const renderCell = React.useCallback((transaction, columnKey) => {
        const cellValue = transaction[columnKey];
        switch (columnKey) {
            case "transactionId":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "bookingId":
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
            case "transactionType":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color='danger' size="sm" >
                        {cellValue}
                    </Chip>
                );
            case "Actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Detail">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <button onClick={() => {
                                    setSelectedTransaction(transaction)
                                    onOpen()
                                }}>
                                    <IconEye/>
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
                    My Transactions History
                </div>
                <Table aria-label="Example table with custom cells">
                    <TableHeader columns={columns as any}>
                        {(column) => (
                            <TableColumn key={column.uid}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={transactions as Transaction[]} emptyContent={"No rows to display."}>
                        {(item) => (
                            <TableRow key={item.bookingId}>
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
                <ModalContent className='h-[350px] w-[500px]'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Transaction Detail</ModalHeader>
                                <ModalBody className='ml-7 mt-6'>
                                    <div className='grid grid-cols-2'>
                                        <div className='col-span-1 font-semibold'>Transaction ID:</div>
                                        <div className='font-medium'>{selectedTransaction?.transactionId}</div>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <div className='font-semibold'>Booking ID:</div>
                                        <div className='font-medium'>{selectedTransaction?.bookingId} </div>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <div className='font-semibold'>Type:</div>
                                        <div className='font-medium'>{selectedTransaction?.transactionType}</div>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <div className='font-semibold'>Total:</div>
                                        <div className='font-medium'>{selectedTransaction?.total} VND</div>
                                    </div>
                                    <div className='grid grid-cols-2'>
                                        <div className='font-semibold'>Status:</div>
                                        <Chip className="capitalize" color={selectedTransaction?.status=="Pending"?`primary`:`danger`} size="sm" >
                                            {selectedTransaction?.status}
                                        </Chip>
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