'use client'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {Button, cn, Radio, RadioGroup, Spinner} from "@nextui-org/react";
import {useExam} from "@/hooks/useExam";
import React from "react";
import {useForm, Controller} from "react-hook-form";
import {Input} from "@mui/material";
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from "@/redux/features/userSlice";
import {userApi} from "@/api/userApi";
import {QuestionBox} from "@/components/Test/QuestionBox";

export default function TestDetailPage({ params }: { params: { licenseTypeId: bigint } }) {

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

    const {getExams} = useExam()
    const {data: exam, isLoading, error,} = getExams(params.licenseTypeId)
    // console.log(params.licenseTypeId)
    // console.log(exam==undefined||exam[0].exams==undefined||exam[0].exams[0].questions)

    const onSubmit = (input) => {
        console.log(input);
    };

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
                Not found exams
            </div>
        )
    }

    return (
        <>
            <div className='w-4/5 gap-2 grid grid-cols-12  px-8 mt-4 mb-4 mx-auto t'>
                <div className='col-span-12  sm:col-span-9 bg-slate-200 rounded-lg p-6'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register(`quizId`)}
                            type='hidden' hidden value={exam[0]?.exams[0]?.ExamId}/>
                        {
                            exam[0]?.exams[0]?.questions?.map((q,index) => (
                                <div key = {index} className='mb-6 mt-3'>
                                    <Input
                                        {...register(`answerDetails[${index}].questionID`)}
                                        type='hidden' hidden value={q.QuestionId}/>
                                    <Controller
                                        control={control}
                                        name={`answerDetails[${index}].answer`}
                                        render={({ field: { onChange, value } }) => (
                                            <RadioGroup
                                                label= {"Question "+ (index+1) + ": " +q.Title}
                                                classNames={{
                                                    base:cn(
                                                        "m-0 bg-content1 hover:bg-content2 ",
                                                        "cursor-pointer rounded-lg gap-4 p-4 border-1 border-transparent",
                                                    )
                                                }}
                                            >
                                                <Radio onChange={onChange} isselected={value} value={q.Option1}>{q.Option1}</Radio>
                                                <Radio onChange={onChange} isselected={value} value={q.Option2}>{q.Option2}</Radio>
                                                <Radio onChange={onChange} isselected={value} value={q.Option3}>{q.Option3}</Radio>
                                                {
                                                    q.Option4!=null&&
                                                    <Radio onChange={onChange} isselected={value} value={q.Option4}>{q.Option4}</Radio>
                                                }

                                            </RadioGroup>
                                        )}
                                    />
                                </div>
                            ))
                        }
                        <Button type='submit'>Submit</Button>
                    </form>
                </div>
                <div className='col-span-12 sm:col-span-3 h-80 bg-slate-200 rounded-lg'></div>
            </div>
        </>
    )
}