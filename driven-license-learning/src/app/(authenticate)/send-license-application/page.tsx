'use client'

import React, {useEffect, useState} from 'react';
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
    TableHeader, TableColumn, TableBody, TableRow, TableCell, Table, Spinner, CardBody
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

type LicenseApplication = {
    licenseTypeID:             number,
    licenseApplicationId:      number,
    citizenIdentificationCard: string,
    healthCertification:       string,
    userImage:                 string,
    curriculumVitae:           string,
    status:                    string,
}

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

    const [selectedFile1, setSelectedFile1] = useState()
    const [preview1, setPreview1] = useState()
    const [selectedFile2, setSelectedFile2] = useState()
    const [preview2, setPreview2] = useState()
    const [selectedFile3, setSelectedFile3] = useState()
    const [preview3, setPreview3] = useState()
    const [selectedFile4, setSelectedFile4] = useState()
    const [preview4, setPreview4] = useState()

    const [licenseTypeId, setLicenseTypeId] =useState()
    const [selectedLicenseApplication,setSelectedLicenseApplication] = useState<Partial<LicenseApplication>>({})

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {isOpen: isOpenUpdate, onOpen: onOpenUpdate, onOpenChange: onOpenChangeUpdate} = useDisclosure();

    const { getLicenseTypes, getLicenseApplicationByCustomer } = useLicenseType();
    const {data: licenseTypes, error} = getLicenseTypes();
    const {data: licenseApplications, isLoading} = getLicenseApplicationByCustomer()
    const router = useRouter()
    const { register, handleSubmit, control } = useForm<FormValues>();
    const { register: registerUpdate, handleSubmit:handleSubmitUpdate, control: controlUpdate } = useForm();
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
        {name: "License Application Id", uid: "licenseApplicationId"},
        {name: "License Type ID", uid: "licenseTypeID"},
        {name: "Citizen Identification Card", uid: "citizenIdentificationCard"},
        {name: "Health Certification", uid: "healthCertification"},
        {name: "User Image", uid: "userImage"},
        {name: "Curriculum Vitae", uid: "curriculumVitae"},
        {name: "Status", uid: "status"},
        {name: "Actions", uid: "Actions"},
    ];

    const renderCell = React.useCallback((licenseApplication, columnKey) => {
        const cellValue = licenseApplication[columnKey];
        switch (columnKey) {
            case "licenseApplicationId":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "licenseTypeID":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "citizenIdentificationCard":
                return (
                    <div className="flex flex-col">
                        <img className="w-[50px] text-sm capitalize" src={cellValue?cellValue:"https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"}/>
                    </div>
                );
            case "healthCertification":
                return (
                    <div className="flex flex-col">
                        <img className="w-[50px] text-sm capitalize" src={cellValue?cellValue:"https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"}/>
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
                                <button onClick={() => {
                                    setSelectedLicenseApplication(licenseApplication)
                                    console.log(selectedLicenseApplication)
                                    onOpenUpdate()}}>
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
                        window.location.reload();
                    })
                console.log(response)
            } catch (error) {
                console.log(error)
                notify("error",'error')
            }
        };
        fetchSend();
    };

    const onSubmitUpdate = (input) => {
        console.log(input)
        const fetchUpdate = async () => {
            try {
                const response = await licenseTypeApi.updateLicenseApplication(selectedLicenseApplication.licenseApplicationId as number, input)
                    .then(r => {
                        notify("Update successfully!",'success');
                        window.location.reload();
                    })
                console.log(response)
            } catch (error) {
                console.log(error)
                notify("error",'error')
            }
        };
        fetchUpdate();
    };

    const onSelectFile1 = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile1(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile1(e.target.files[0])
    }
    const onSelectFile2 = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile2(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile2(e.target.files[0])
    }
    const onSelectFile3 = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile3(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile3(e.target.files[0])
    }
    const onSelectFile4 = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile4(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile4(e.target.files[0])
    }

    useEffect(() => {
        if (!selectedFile1) {
            setPreview1(undefined)
            return
        }

        const objectUrl1 = URL.createObjectURL(selectedFile1)
        setPreview1(objectUrl1)

        if (!selectedFile2) {
            setPreview2(undefined)
            return
        }

        const objectUrl2 = URL.createObjectURL(selectedFile2)
        setPreview2(objectUrl2)

        if (!selectedFile3) {
            setPreview3(undefined)
            return
        }

        const objectUrl3 = URL.createObjectURL(selectedFile3)
        setPreview3(objectUrl3)

        if (!selectedFile4) {
            setPreview4(undefined)
            return
        }

        const objectUrl4 = URL.createObjectURL(selectedFile4)
        setPreview4(objectUrl4)

        // free memory when ever this component is unmounted
        return () => {
            URL.revokeObjectURL(objectUrl1)
            URL.revokeObjectURL(objectUrl2)
            URL.revokeObjectURL(objectUrl3)
            URL.revokeObjectURL(objectUrl4)
        }
    }, [selectedFile1,selectedFile2,selectedFile3,selectedFile4])

    if (isLoading) {
        return (
            <div className='content-center text-center mt-6'>
                <Spinner className='mt-6' />
            </div>
        )
    }

    if (error|| licenseApplications==undefined) {
        return (
            <div className='content-center text-center mt-6'>
                Can not use function
            </div>
        )
    }

    return (
        <div>
            <div className='h-screen' style={{ width: '100%'}}>
                <div className='font-bold text-xl text-center mt-4 mb-2'>My license application</div>
                <div className='mx-auto mt-12 max-w-[1000px]'>
                    <div className='mb-2'>
                        <Button color='secondary' onClick={(e) => {
                            onOpen()
                        }}>+ Import</Button>
                    </div>
                    <Table  aria-label="Example table with custom cells">
                        <TableHeader columns={columns as any}>
                            {(column) => (
                                <TableColumn key={column.uid}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={licenseApplications as []} emptyContent={"No rows to display."}>
                            {(item) => (
                                <TableRow key={item.licenseApplicationId}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpenUpdate}
                onOpenChange={onOpenChangeUpdate}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent className='h-[600px] w-[600px]'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Update License Application</ModalHeader>
                            <form onSubmit={handleSubmitUpdate(onSubmitUpdate)}>
                                <ModalBody>
                                    <Card isFooterBlurred className="h-[450px]">
                                        <CardBody>
                                            <div className='mx-6 mt-2'>
                                                <div className='font-semibold mb-3'>License Application ID: {selectedLicenseApplication.licenseApplicationId}</div>
                                                <div className='font-semibold mb-3'>License Type ID: {selectedLicenseApplication.licenseTypeID}</div>
                                                <div className='font-semibold mb-3 '>Citizen Identification Card: </div>
                                                <div className='text-center mb-3'>
                                                    <Controller
                                                        control={controlUpdate}
                                                        name="CitizenIdentificationCard"
                                                        render={({ field: { value, onChange, ...field } }) => {
                                                            return (
                                                                <input
                                                                    {...field}
                                                                    value={value?.fileName}
                                                                    onChange={(event) => {
                                                                        onChange(event.target?.files[0]);
                                                                        onSelectFile1(event)
                                                                    }}
                                                                    type="file"
                                                                    size='sm'
                                                                    className='mx-auto mb-2 w-4/5'
                                                                />
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <img src={preview1?preview1:selectedLicenseApplication.citizenIdentificationCard} />
                                                <div className='font-semibold mb-3 '>Health Certification: </div>
                                                <div className='text-center mb-3'>
                                                    <Controller
                                                        control={controlUpdate}
                                                        name="HealthCertification"
                                                        render={({ field: { value, onChange, ...field } }) => {
                                                            return (
                                                                <input
                                                                    {...field}
                                                                    value={value?.fileName}
                                                                    onChange={(event) => {
                                                                        onChange(event.target?.files[0]);
                                                                        onSelectFile2(event)
                                                                    }}
                                                                    type="file"
                                                                    size='sm'
                                                                    className='mx-auto mb-2 w-4/5'
                                                                />
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <img src={preview2?preview2:selectedLicenseApplication.healthCertification} />
                                                <div className='font-semibold mb-3 '>User Image: </div>
                                                <div className='text-center mb-3'>
                                                    <Controller
                                                        control={controlUpdate}
                                                        name="UserImage"
                                                        render={({ field: { value, onChange, ...field } }) => {
                                                            return (
                                                                <input
                                                                    {...field}
                                                                    value={value?.fileName}
                                                                    onChange={(event) => {
                                                                        onChange(event.target?.files[0]);
                                                                        onSelectFile3(event)
                                                                    }}
                                                                    type="file"
                                                                    size='sm'
                                                                    className='mx-auto mb-2 w-4/5'
                                                                />
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <img src={preview3?preview3:selectedLicenseApplication.userImage} />
                                                <div className='font-semibold mb-3 '>Curriculum Vitae: </div>
                                                <div className='text-center mb-3'>
                                                    <Controller
                                                        control={controlUpdate}
                                                        name="CurriculumVitae"
                                                        render={({ field: { value, onChange, ...field } }) => {
                                                            return (
                                                                <input
                                                                    {...field}
                                                                    value={value?.fileName}
                                                                    onChange={(event) => {
                                                                        onChange(event.target?.files[0]);
                                                                        onSelectFile4(event)
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
                                            <img src={preview4?preview4:selectedLicenseApplication.curriculumVitae} />
                                            <Spacer y='4'/>

                                        </CardBody>

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
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent className='h-[600px] w-[600px]'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Form License Application</ModalHeader>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <ModalBody>
                                    <Select
                                        items={licenseTypes as any}
                                        label="Package Types"
                                        placeholder="Select a package"
                                        className="max-w-xs mx-auto mt-3 mb-3 w-full"
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