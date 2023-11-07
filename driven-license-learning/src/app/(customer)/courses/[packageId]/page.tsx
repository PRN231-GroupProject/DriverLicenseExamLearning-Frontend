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
import {useRouter} from "next/navigation";

export default function CourseDetailPage({ params }: { params: { packageId: bigint } }) {

    const router = useRouter()

    const { getPackageById } = usePackage();
    const { getCars } = useCar();
    const { getMentors } = useUser();
    const {data: packages, isLoading, error} =getPackageById(params.packageId);
    const {data: cars, isLoading: isLoadingCar, error: errorCar} =getCars();
    const {data: mentors, isLoading: isLoadingMentor, error: errorMentor} =getMentors();
    const package1 = packages == undefined||packages[0]


    const [ optionCars, setOptionCars] = useState([])
    const [ optionMentors, setOptionMentors] = useState([])

    const [ carId, setCarId] = useState(0)
    const [ mentorId, setMentorId] = useState(0)
    const [ booking, setBooking] = useState({
        packageId : params.packageId,
        carId : 0,
        mentorId : 0
    })

    const handleCarChange = (e) => {
        setCarId(e.target.value);
        setBooking({
            ...booking,
            carId: e.target.value
        })
    };

    const handleMentorChange = (e) => {
        setMentorId(e.target.value);
        setBooking({
            ...booking,
            mentorId: e.target.value
        })
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

    const handleBooking = (e) => {
        console.log(booking)
        const fetchBooking = async () => {
            var response;
            try {
                console.log(booking)
                response = await bookingApi.postBooking(booking)
                    .then(r => {
                        notify("Booking sucessfully!",'success');
                        router.push(`/transaction/${r.bookingId}`)
                    })
                console.log(response)
            } catch (error) {
                console.log(error)
                notify("error",'error')
            }
        };
        fetchBooking();
    };

    useEffect(() => {
        if (cars) {
            const car = cars.map(row => {
                return row;
            });
            setOptionCars(car);
        }
    }, [cars]);

    useEffect(() => {
        if (mentors) {
            const mentor = mentors.map(row => {
                return row;
            });
            setOptionMentors(mentor);
        }
    }, [mentors]);


    if (isLoading && isLoadingCar && isLoadingMentor) {
        return (
            <div className='content-center text-center mt-6'>
                <Spinner className='mt-6' />
            </div>
        )
    }

    if (error || errorCar || errorMentor) {
        return (
            <div className='content-center text-center mt-6'>
                Can not use function
            </div>
        )
    }

    return (
        <div>
            <div className='w-full h-[500px] grid grid-cols-12 grid-rows-2 grid-flow-col'>
                    <Card isFooterBlurred className="w-full col-span-8 row-span-2 ml-4 mt-6 mb-1">
                        <CardHeader className="absolute z-10 top-1 flex-col justify-between">
                            <h4 className="text-black font-medium text-2xl">{package1.packageName}</h4>
                        </CardHeader>
                        <Divider className="absolute z-10 top-16"/>
                        <CardBody className="absolute z-10 top-20 flex-col justify-center content-center flex-wrap h-2/3">
                            <div className='w-full h-full h-11/12 grid grid-rows-6 p-1'>
                                <p className='row-span-2 font-medium'>
                                    Description: <span className='font-normal'>{package1.description}</span>
                                </p>
                                <p className='row-span-1 font-medium'>
                                    License Type: <span className='font-normal'>{package1.licenseType==undefined||package1.licenseType[0].licenseName}</span>
                                </p>
                                <p className='row-span-1 font-medium'>
                                    Package Type: <span className='font-normal'>{package1.packageTypes==undefined||package1.packageTypes[0].packageTypeName}</span>
                                </p>
                                <p className='row-span-1 font-medium'>
                                    Price: <span className='font-normal'>{package1.price}</span>
                                </p>
                                <p className='row-span-1 font-medium'>
                                    Number Of Km One Day: <span className='font-normal'>{package1.numberOfKmOrDays} {package1.packageTypes==undefined||package1.packageTypes[0].packageTypeName}</span>
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                    <Card isFooterBlurred className="w-5/6 col-span-4 row-span-1 mx-auto mt-6 mb-1">
                        <CardHeader className="absolute z-10 top-1 flex-col justify-between">
                            <h4 className="text-black font-medium text-2xl">Car</h4>
                        </CardHeader>
                        <Divider className="absolute z-10 top-16"/>
                        <CardBody className="absolute z-10 top-16 flex-col justify-center content-center flex-wrap h-2/3">
                            <Select
                                items={optionCars}
                                label="Car"
                                placeholder="Select a car"
                                className="max-w-xs"
                                onChange={handleCarChange}
                            >
                                {(car) => <SelectItem key={car.carId} value={car.carId}>{car.carName}</SelectItem>}
                            </Select>
                        </CardBody>
                    </Card>
                    <Card isFooterBlurred className="w-5/6 col-span-4 row-span-1 mx-auto mt-6 mb-1">
                        <CardHeader className="absolute z-10 top-1 flex-col justify-between">
                            <h4 className="text-black font-medium text-2xl">Mentor</h4>
                        </CardHeader>
                        <Divider className="absolute z-10 top-16"/>
                        <CardBody className="absolute z-10 top-16 flex-col justify-center content-center flex-wrap h-2/3">
                            <Select
                                items={optionMentors}
                                label="Mentor"
                                placeholder="Select a mentor"
                                className="max-w-xs"
                                onChange={handleMentorChange}
                            >
                                {(mentor) => <SelectItem key={mentor.userId} value={mentor.userId}>{mentor.userName}</SelectItem>}
                            </Select>
                        </CardBody>
                    </Card>
            </div>
            <div className='text-center mt-4'>
                <Button className="text-tiny mx-auto " color="primary" radius="full" size="md"
                        onClick={handleBooking}
                >
                    Booking now
                </Button>
            </div>
        </div>
    )
}