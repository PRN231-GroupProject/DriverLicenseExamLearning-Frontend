'use client'
import {Button} from "@nextui-org/react";
import {useLicenseType} from "@/hooks/useLicenseType";
import {useRouter} from "next/navigation";

export default function TestPage() {

    const { getLicenseTypes } = useLicenseType();
    const {data: licenseTypes, error} = getLicenseTypes();
    console.log(licenseTypes)
    const router = useRouter()

    return (
        <>
            <div className='w-4/5 gap-2 px-8 mt-4 mb-4 mx-auto t'>
                    {
                        licenseTypes?.map( (l,index) => (
                            <Button onClick={(e) => {
                                router.push(`/test/${l.licenseTypeId}`)
                            }}>{l.licenseName}</Button>
                        ))
                    }
            </div>
        </>
    )
}