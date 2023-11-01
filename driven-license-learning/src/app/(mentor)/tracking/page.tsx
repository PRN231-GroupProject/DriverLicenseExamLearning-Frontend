'use client'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import CourseBox from "@/components/Courses/CourseBox";
import {usePackage} from "@/hooks/usePackage";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader, Radio, RadioGroup,
    useDisclosure
} from "@nextui-org/react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import React from "react";
import {useForm} from "react-hook-form";
import {userApi} from "@/api/userApi";

export default function TrackingPage() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const form = useForm();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    const onSubmit = (input) => {
        console.log(input);
    };

    return (
        <>
            <div className='w-80 gap-2 px-8  t' style={{ width: '100%'}}>
                <Button onClick={onOpen}>Import Tracking</Button>
            </div>

            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent className='h-[800px] w-[500px]'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 mt-2 text-center">Add Tracking</ModalHeader>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <ModalBody className='text-center'>

                                    <Input
                                        {...register("note")}
                                        type="tel" label="Note"
                                        size='sm'
                                        placeholder="Enter your note"
                                        className='mx-auto mt-6 mb-2 w-5/6'
                                    />
                                    <Input
                                        {...register("processing")}
                                        type="text" label="Processing"
                                        size='sm'
                                        placeholder="Number of dates/kms"
                                        className='mx-auto mt-6 mb-2 w-5/6'
                                    /><RadioGroup
                                    {...register("processing1")}
                                    label="Select your favorite city"
                                >
                                    <Radio value="buenos-aires">Buenos Aires</Radio>
                                    <Radio value="sydney">Sydney</Radio>
                                    <Radio value="san-francisco">San Francisco</Radio>
                                    <Radio value="london">London</Radio>
                                    <Radio value="tokyo">Tokyo</Radio>
                                </RadioGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type='submit'>
                                        Confirm
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}