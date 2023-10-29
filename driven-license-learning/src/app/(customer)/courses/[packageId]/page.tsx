'use client'
import {usePackage} from "@/hooks/usePackage";

export default function CourseDetailPage({ params }: { params: { packageId: bigint } }) {
    const { getPackageById } = usePackage();
    const {data: packages, error} =getPackageById(params.packageId);
    console.log(packages == undefined||packages[0])
    return (
        <div>My Post: {packages == undefined||packages[0].packageId}
            <div className='w-4/5 gap-2 grid grid-cols-12 grid-rows-3 px-8 mt-4 mb-4 mx-auto t bg-slate-200'>
            </div>
        </div>
    )
}