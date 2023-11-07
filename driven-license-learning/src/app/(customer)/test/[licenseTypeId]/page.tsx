'use client'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {Button, cn, Radio, RadioGroup, Spinner} from "@nextui-org/react";
import {useExam} from "@/hooks/useExam";
import React, {useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {Input} from "@mui/material";
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from "@/redux/features/userSlice";
import {userApi} from "@/api/userApi";
import {QuizForm} from "@/components/Test/QuizForm";
import {useRouter, useSearchParams} from "next/navigation";

export default function TestDetailPage({ params }: { params: { licenseTypeId: number } }) {

    const router = useRouter()

    const searchParams = useSearchParams()

    const [examId, setExamId] = useState(searchParams.get('examId')?searchParams.get('examId'):0)

    const { getExamFilter } = useExam()
    const {data: exams, isLoading: isLoadingExams, error: errorExams} = getExamFilter(params.licenseTypeId,0);

    console.log(exams)
    console.log(examId)
    const examList = exams==undefined||exams[0]

    if (isLoadingExams) {
        return (
            <div className='content-center text-center mt-6'>
                <Spinner className='mt-6' />
            </div>
        )
    }

    if (errorExams||exams.length==0) {
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
                    examList!==true&&examList.exams.map( (ex,index) => (
                        <Button key={index} onClick={(e) => {
                            // router.push(`/test/${l.licenseTypeId}`)
                            setExamId(ex.examId)
                            router.push(`?examId=${ex.examId}`)
                        }}>{ex.examName}</Button>
                    ))
                }
            </div>
            {
                examId!==0&&
                <QuizForm
                    licenseTypeId = {params.licenseTypeId}
                    examId ={examId}
                />
            }
        </>
    )
}