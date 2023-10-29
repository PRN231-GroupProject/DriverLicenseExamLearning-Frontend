'use client'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import CourseBox from "@/components/Courses/CourseBox";
import {usePackage} from "@/hooks/usePackage";

export default function CoursesPage() {

    const { getPackages } = usePackage();
    const {data: packages, error} =getPackages();

    return (
        <>
            <div className='w-80 gap-2 px-8  t' style={{ width: '100%'}}>
                {
                    packages?.map((r, index) => (
                        <div key = {index} className='grid grid-cols-12 mt-5 mx-2'>
                            <div className='col-span-12 sm:col-span-2'></div>
                            <CourseBox
                                packageId = {r.packageId}
                                packageName ={r.packageName}
                                description = {r.description}
                                price = {r.price}
                            />
                            <div className='col-span-12 sm:col-span-2'></div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}