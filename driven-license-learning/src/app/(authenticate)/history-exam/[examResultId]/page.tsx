'use client'
import {Button, cn, Input, Radio, RadioGroup, Spinner} from "@nextui-org/react";
import {QuizForm} from "@/components/Test/QuizForm";
import React from "react";
import {Controller} from "react-hook-form";
import {useExam} from "@/hooks/useExam";

export default function HistoryExamDetailPage({ params }: { params: { examResultId: number } }) {

    const {getExamHistoryDetailFilter} = useExam()
    const {data: exam, isLoading, error,} = getExamHistoryDetailFilter(params.examResultId)

    console.log(exam)
    if (isLoading) {
        return (
            <div className='content-center text-center mt-6'>
                <Spinner className='mt-6' />
            </div>
        )
    }

    if (error||exam.length==0) {
        return (
            <div className='content-center text-center mt-6'>
                Not found exams
            </div>
        )
    }

    return (
        <>
            <div className='w-4/5 mt-4 mb-4 mx-auto t'>
                <div className='col-span-12  sm:col-span-9 bg-slate-200 rounded-lg p-6'>
                        {
                            exam!=undefined&&exam?.map((q,index) => (
                                <div key = {index} className='mb-6 mt-3'>
                                    <RadioGroup
                                        label= {"Question "+ (index+1) + ": " +q.title}
                                        classNames={{
                                            base:cn(
                                                "m-0 bg-content1 hover:bg-content2 font-semibold",
                                                "cursor-pointer rounded-lg gap-4 p-4 border-1 border-transparent",
                                            )
                                        }}
                                        isInvalid={q.userAnswer!=q.rightAnswer}
                                        defaultValue={q.userAnswer}
                                    >
                                        <Radio isDisabled value={q.option1}>{q.option1}</Radio>
                                        <Radio isDisabled  value={q.option2}>{q.option2}</Radio>
                                        <Radio isDisabled value={q.option3}>{q.option3}</Radio>
                                        {
                                            q.option4!=""&&
                                            <Radio isDisabled value={q.option4}>{q.option4}</Radio>
                                        }
                                        {
                                            q.image!=""&&
                                            <img src={q.image}/>
                                        }
                                        <div className='text-red-500 font-bold'>Right answer: {q.rightAnswer}</div>
                                    </RadioGroup>
                                </div>
                            ))
                        }
                </div>
            </div>
        </>
    )
}