'use client'
import {usePackage} from "@/hooks/usePackage";

export default function CourseDetailPage({ params }: { params: { packageId: bigint } }) {
    const { getPackageById } = usePackage();
    const {data: packages, error} =getPackageById(params.packageId);
    console.log(packages == undefined||packages[0])
    return <div>My Post: {packages == undefined||packages[0].packageId}</div>
}