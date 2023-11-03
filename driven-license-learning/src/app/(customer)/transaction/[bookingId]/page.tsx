'use client'
import {usePackage} from "@/hooks/usePackage";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
    Select,
    SelectItem, Spacer, Spinner, useDisclosure
} from "@nextui-org/react";
import {useForm} from "react-hook-form";
import {useCar} from "@/hooks/useCar";
import React, {useEffect, useState} from "react";
import {useUser} from "@/hooks/useUser";
import {bookingApi} from "@/api/bookingApi";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker, { DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import {memberDayRegisterApi} from "@/api/memberDayRegisterApi";
import {router} from "next/client";
import {useBooking} from "@/hooks/useBooking";
import {trackingApi} from "@/api/trackingApi";
import {transactionApi} from "@/api/transactionApi";
import {useRouter} from "next/navigation";

export default function TransactionPage({ params }: { params: { bookingId: number } }) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const router = useRouter()
    const { getBookingById } = useBooking();
    const {data: bookings, isLoading, error} = getBookingById(params.bookingId);
    const bookings1 = bookings == undefined||bookings[0]

    console.log(bookings1)
    const [dates, setDates] = useState([])

    const [ optionDates, setOptionDates] = useState([])

    const [ bookingId, setBookingId] = useState(0)

    useEffect(() => {
        if (dates) {
            const date = dates.map(row => {
                return row.format('YYYY-MM-DD');
            });
            setOptionDates(date);
        }
    }, [dates]);

    const handleTransaction = (e) => {
        console.log(bookings1.package[0].price)
        const fetchTransaction = async () => {
            var response;
            try {
                response = await transactionApi.postTransaction(bookings1.bookingId)
                    .then(r => {
                        notify(r.msg,'success');
                        onOpen()
                    })
                console.log(response)
            } catch (error) {
                console.log(error)
                notify("error",'error')
            }
        };
        fetchTransaction();
    };

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

    const handleRegisterDay = (e) => {
        console.log(optionDates)
        console.log(bookings1.bookingId)
        const fetchRegisterDay = async () => {
            var response;
            try {
                console.log(optionDates)
                response = await memberDayRegisterApi.postMemberDayRegisterApi(bookings1.bookingId, optionDates)
                    .then(r => {
                        notify(r.msg,'success');
                        router.push('/courses')
                    })
                console.log(response)
            } catch (error) {
                console.log(error.response.data)
                notify(error.response.data.Message,'error')
            }
        };
        fetchRegisterDay();
    }

    if (isLoading) {
        return (
            <div className='content-center text-center mt-6'>
                <Spinner className='mt-6' />
            </div>
        )
    }

    if(error) {
        return (
            <div className='content-center text-center mt-6'>
                Can not use function
            </div>
        )
    }

    return (
        <div>
            <div className='w-full h-[500px] text-center'>
                <Card isFooterBlurred className="w-3/5 h-[500px] mx-auto mt-6 mb-1">
                    <CardHeader className="absolute z-10 top-1 flex-col justify-between">
                        <h4 className="text-black font-medium text-2xl">{bookings1.package==undefined||bookings1.package[0].packageName}</h4>
                    </CardHeader>
                    <Divider className="absolute z-10 top-16"/>
                    <CardBody className="absolute z-10 top-20 flex-col justify-center content-center flex-wrap h-2/3">
                        <div className='w-full h-full h-11/12 grid grid-rows-8 p-1'>
                            <p className='row-span-2 font-medium'>
                                Description: <span className='font-normal'>{bookings1.package==undefined||bookings1.package[0].description}</span>
                            </p>
                            <p className='row-span-1 font-medium'>
                                Price: <span className='font-normal'>{bookings1.package==undefined||bookings1.package[0].price}</span>
                            </p>
                            <p className='row-span-1 font-medium'>
                                Number Of Km Or Days: <span className='font-normal'>{bookings1.package==undefined||bookings1.package[0].numberOfKmOrDays} (km/days)</span>
                            </p>
                            <p className='row-span-1 font-medium'>
                                Car: <span className='font-normal'>{bookings1.car==undefined||bookings1.car[0].carName}</span>
                            </p>
                            <p className='row-span-1 font-medium'>
                                Mentor: <span className='font-normal'>{bookings1.mentor==undefined||bookings1.mentor[0].userName}</span>
                            </p>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className='text-center mt-4'>
                <Button className="text-tiny mx-auto " color="primary" radius="full" size="md"
                        onClick={handleTransaction}
                >
                    Pay now
                </Button>
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent className='h-[500px] w-[700px]'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Choose Date Learning</ModalHeader>
                            <ModalBody className='text-center'>
                                <DatePicker
                                    value={dates}
                                    onChange={setDates}
                                    multiple
                                    plugins={[
                                        <DatePanel sort="date" />
                                    ]}/>
                                {optionDates.map((d,index) => (
                                    <div>Day {index+1}: {d}</div>
                                ))}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={handleRegisterDay}>
                                    Confirm
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}