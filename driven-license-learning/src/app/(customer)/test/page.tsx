'use client'
import {Button, cn, Radio, RadioGroup, Spinner} from "@nextui-org/react";
import {useLicenseType} from "@/hooks/useLicenseType";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {useExam} from "@/hooks/useExam";
import {Controller, useForm} from "react-hook-form";

export default function TestPage() {

    const [licenseTypeId, setLicenseTypeId] = useState<number>(0)
    const [examId, setExamId] = useState<number>(0)

    const form = useForm({
        defaultValues:{
            answerDetails : [{}]
        },
        mode: 'onChange'
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    const { getLicenseTypes } = useLicenseType();
    const { getExamFilter } = useExam()
    const {data: licenseTypes, isLoading, error} = getLicenseTypes();
    const {data: exams, isLoading: isLoadingExams, error: errorExams} = getExamFilter(licenseTypeId,examId);

    console.log(exams==undefined||exams[0])
    const examList = exams==undefined||exams[0]
    const router = useRouter()

    const onSubmit = (input) => {
        console.log(input);
    };

    if (isLoading||isLoadingExams) {
        return (
            <div className='content-center text-center mt-6'>
                <Spinner className='mt-6' />
            </div>
        )
    }

    if (error||errorExams) {
        return (
            <div className='content-center text-center mt-6'>
                Not found exams
            </div>
        )
    }

    return (
        <>
            <div className='w-4/5 gap-2 px-8 mt-4 mb-4 mx-auto text-center'>
                    {
                        licenseTypes?.map( (l,index) => (
                            <Button key={index} onClick={(e) => {
                                // router.push(`/test/${l.licenseTypeId}`)
                                setLicenseTypeId(l.licenseTypeId)
                            }}>{l.licenseName}</Button>
                        ))
                    }

            </div>
            <div className='w-4/5 gap-2 px-8 mt-4 mb-4 mx-auto text-center'>
                {
                    examList!==true&&examList.exams.map( (ex,index) => (
                        <Button key={index} onClick={(e) => {
                            // router.push(`/test/${l.licenseTypeId}`)
                            setExamId(ex.examId)
                        }}>{ex.examName}</Button>
                    ))
                }

            </div>
            <div className='w-4/5 mt-4 mb-4 mx-auto t'>
                <div className='col-span-12  sm:col-span-9 bg-slate-200 rounded-lg p-6'>

                </div>
            </div>
        </>
    )
}