'use client'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {Button, Link, Radio, RadioGroup} from "@nextui-org/react";
import {useLicenseType} from "@/hooks/useLicenseType";
import {useRouter} from "next/navigation";

export default function TestPage() {

    const { getLicenseTypes } = useLicenseType();
    const {data: licenseTypes, error} = getLicenseTypes();
    console.log(licenseTypes)
    const router = useRouter()

    return (
        <>
            <div className='w-4/5 gap-2 grid grid-cols-12 grid-rows-3 px-8 mt-4 mb-4 mx-auto t'>
                <div className='col-span-12 row-span-3 sm:col-span-9 row-span-3 bg-slate-200 rounded-lg p-6'>
                    {
                        licenseTypes?.map( (l,index) => (
                            <Button onClick={(e) => {
                                router.push(`/test/${l.licenseTypeId}`)
                            }}>{l.licenseName}</Button>
                        ))
                    }
                </div>
                <div className='col-span-12 sm:col-span-3 h-80 bg-slate-200 rounded-lg'></div>
            </div>
        </>
    )
}