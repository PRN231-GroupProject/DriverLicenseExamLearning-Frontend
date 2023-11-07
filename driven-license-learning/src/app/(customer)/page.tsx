'use client'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {usePackage} from "@/hooks/usePackage";

export default function HomePage() {

    const { getPackages } = usePackage();
    const {data: packages, error} =getPackages();

    return (
        <>
            <div className='w-80 gap-2 px-8  t' style={{ width: '100%'}}>

            </div>
        </>
    )
}