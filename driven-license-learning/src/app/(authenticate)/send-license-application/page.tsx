'use client'

import React, {useState} from 'react';
import {
    Card,
    Spacer,
    Button,
    Input,
    Link,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Modal,
    useDisclosure,
    SelectItem,
    Select,
    Chip,
    Tooltip,
    TableHeader, TableColumn, TableBody, TableRow, TableCell, Table, Spinner
} from '@nextui-org/react';
import { IconReceiptRefund , IconEye } from '@tabler/icons-react';
import {useForm, Controller, Control} from "react-hook-form";
import {AppDispatch} from "@/redux/store";
import {userApi} from "@/api/userApi";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {useLicenseType} from "@/hooks/useLicenseType";
import {licenseTypeApi} from "@/api/licenseTypeApi";
import {bookingApi} from "@/api/bookingApi";

type FormValues = {
    CitizenIdentificationCard: string,
    HealthCertification: string,
    UserImage: string,
    CurriculumVitae: string,
}

type Columns =
    {
        name: string,
        uid: string
    }
export default function SendLicenseApplicationPage() {

    const [licenseTypeId, setLicenseTypeId] =useState()

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const { getLicenseTypes, getLicenseApplicationByCustomer } = useLicenseType();
    const {data: licenseTypes, error} = getLicenseTypes();
    const {data: licenseApplications, isLoading} = getLicenseApplicationByCustomer()
    console.log(licenseApplications)

    const router = useRouter()
    const { register, handleSubmit, control } = useForm<FormValues>();

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

    const columns:Columns[]= [
        {name: "licenseTypeID", uid: "licenseTypeID"},
        {name: "citizenIdentificationCard", uid: "citizenIdentificationCard"},
        {name: "healthCertification", uid: "healthCertification"},
        {name: "userImage", uid: "userImage"},
        {name: "curriculumVitae", uid: "curriculumVitae"},
        {name: "status", uid: "status"},
        {name: "Actions", uid: "Actions"},
    ];

    const renderCell = React.useCallback((licenseApplication, columnKey) => {
        const cellValue = licenseApplication[columnKey];
        switch (columnKey) {
            case "licenseTypeID":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "citizenIdentificationCard":
                return (
                    <div className="flex flex-col">
                        <img className="w-[50px] text-sm capitalize" src={cellValue}/>
                    </div>
                );
            case "healthCertification":
                return (
                    <div className="flex flex-col">
                        <img className="w-[50px] text-sm capitalize" src={cellValue}/>
                    </div>
                );
            case "curriculumVitae":
                return (
                    <div className="flex flex-col">
                        <img className="w-[50px] text-sm capitalize" src={cellValue}/>
                    </div>
                );
            case "userImage":
                return (
                    <div className="flex flex-col">
                        <img className="w-[50px] text-sm capitalize" src={cellValue}/>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color='primary' size="sm" >
                        {cellValue}
                    </Chip>
                );
            case "Actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Update">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <button>
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


    const handleLicenseType = (e) => {
        setLicenseTypeId(e.target.value);
    };

    const onSubmit = (input) => {
        console.log(licenseTypeId)
        console.log(input);
        const fetchSend = async () => {
            try {
                const response = await licenseTypeApi.sendLicenseApplication(licenseTypeId, input)
                    .then(r => {
                        notify("Apply successfully!",'success');
                    })
                console.log(response)
            } catch (error) {
                console.log(error)
                notify("error",'error')
            }
        };
        fetchSend();
    };

    if (isLoading) {
        return (
            <div className='content-center text-center mt-6'>
                <Spinner className='mt-6' />
            </div>
        )
    }

    return (
        <div>
            <div className='h-screen' style={{ width: '100%'}}>
                <div className='font-bold text-xl text-center mt-4 mb-2'>My license application</div>
                <div className='mx-auto mt-12 w-11/12'>
                    <div className='mb-2'>
                        <Button color='secondary' onClick={(e) => {
                            onOpen()
                        }}>+ Import</Button>
                    </div>
                    <Table  aria-label="Example table with custom cells">
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={licenseApplications} emptyContent={"No rows to display."}>
                            {(item) => (
                                <TableRow key={item.licenseTypeID}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent className='h-[600px] w-[500px]'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Form License Application</ModalHeader>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <ModalBody>
                                    <Select
                                        items={licenseTypes}
                                        label="Package Types"
                                        placeholder="Select a package"
                                        className="max-w-xs mx-auto mt-3 w-full"
                                        onChange={handleLicenseType}
                                    >
                                        {(licenseType) => <SelectItem key={licenseType.licenseTypeId} value={licenseType.licenseTypeId}>{licenseType.licenseName}</SelectItem>}
                                    </Select>
                                    <Card isFooterBlurred className="h-[350px] p-1">
                                        <div className='mx-6 mt-6'>
                                            <div>Citizen Identification Card: </div>
                                            <div className='text-center mb-3'>
                                                <Controller
                                                    control={control}
                                                    name="CitizenIdentificationCard"
                                                    render={({ field: { value, onChange, ...field } }) => {
                                                        return (
                                                            <input
                                                                {...field}
                                                                value={value?.fileName}
                                                                onChange={(event) => {
                                                                    onChange(event.target?.files[0]);
                                                                }}
                                                                type="file"
                                                                size='sm'
                                                                className='mx-auto mb-2 w-4/5'
                                                            />
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div>Health Certification: </div>
                                            <div className='text-center mb-3'>
                                                <Controller
                                                    control={control}
                                                    name="HealthCertification"
                                                    render={({ field: { value, onChange, ...field } }) => {
                                                        return (
                                                            <input
                                                                {...field}
                                                                value={value?.fileName}
                                                                onChange={(event) => {
                                                                    onChange(event.target?.files[0]);
                                                                }}
                                                                type="file"
                                                                size='sm'
                                                                className='mx-auto mb-2 w-4/5'
                                                            />
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div>User Image: </div>
                                            <div className='text-center mb-3'>
                                                <Controller
                                                    control={control}
                                                    name="UserImage"
                                                    render={({ field: { value, onChange, ...field } }) => {
                                                        return (
                                                            <input
                                                                {...field}
                                                                value={value?.fileName}
                                                                onChange={(event) => {
                                                                    onChange(event.target?.files[0]);
                                                                }}
                                                                type="file"
                                                                size='sm'
                                                                className='mx-auto mb-2 w-4/5'
                                                            />
                                                        );
                                                    }}
                                                />
                                            </div>
                                            <div>Curriculum Vitae: </div>
                                            <div className='text-center mb-3'>
                                                <Controller
                                                    control={control}
                                                    name="CurriculumVitae"
                                                    render={({ field: { value, onChange, ...field } }) => {
                                                        return (
                                                            <input
                                                                {...field}
                                                                value={value?.fileName}
                                                                onChange={(event) => {
                                                                    onChange(event.target?.files[0]);
                                                                }}
                                                                type="file"
                                                                size='sm'
                                                                className='mx-auto mb-2 w-4/5'
                                                            />
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <Spacer y='4'/>
                                    </Card>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type='submit' onClick={() => {
                                        onClose()
                                    }}>
                                        Confirm
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}