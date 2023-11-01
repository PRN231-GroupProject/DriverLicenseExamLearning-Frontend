'use client'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {Radio, RadioGroup} from "@nextui-org/react";
import {useExam} from "@/hooks/useExam";

export default function TestDetailPage({ params }: { params: { licenseTypeId: bigint } }) {

    const {getExams} = useExam()
    const {data: exam} = getExams(params.licenseTypeId)
    console.log(exam)
    return (
        <>
            <div className='w-4/5 gap-2 grid grid-cols-12 grid-rows-3 px-8 mt-4 mb-4 mx-auto t'>
                <div className='col-span-12 row-span-3 sm:col-span-9 row-span-3 bg-slate-200 rounded-lg p-6'>
                    <RadioGroup
                        label="Select your favorite city"
                    >
                        <Radio value="buenos-aires">Buenos Aires</Radio>
                        <Radio value="sydney">Sydney</Radio>
                        <Radio value="san-francisco">San Francisco</Radio>
                        <Radio value="london">London</Radio>
                    </RadioGroup>
                    <RadioGroup
                        label="Select your favorite city"
                    >
                        <Radio value="buenos-aires">Buenos Aires</Radio>
                        <Radio value="sydney">Sydney</Radio>
                        <Radio value="san-francisco">San Francisco</Radio>
                        <Radio value="london">London</Radio>
                    </RadioGroup>
                </div>
                <div className='col-span-12 sm:col-span-3 h-80 bg-slate-200 rounded-lg'></div>
            </div>
        </>
    )
}