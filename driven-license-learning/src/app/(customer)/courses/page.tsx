'use client'
import {CourseBox} from "@/components/Courses/CourseBox";
import {usePackage} from "@/hooks/usePackage";
import React, { useState} from "react";
import { Select, SelectItem} from "@nextui-org/react";
import {useForm} from "react-hook-form";

type TProp = {
    label?: string;
    value?: string;
    description?: string;
}

export default function CoursesPage() {

    const [ licenseType, setLicenseType ] = useState<TProp[]>([
        {
            label : "",
            value : "None",
            description: "",
        },
        {
            label : "A1",
            value : "A1",
            description: "",

        },
        {
            label : "A2",
            value : "A2",
            description: "",
        },
        {
            label : "B1",
            value : "B1",
            description: "",

        }
    ])
    const [ licenseName, setLicenseName ] = useState("")
    const { getPackages, getPackageByLicenseType,getPackagesFilter } = usePackage();
    const {data: packages, error} = getPackagesFilter(licenseName);

    const handlePackageType = (e) => {
        setLicenseName(e.target.value);
        console.log(licenseName)
    };

    return (
        <>
            <div className='content-center text-center'>
                <Select
                    items={licenseType as any}
                    label="License Types"
                    placeholder="Select a License"
                    className="max-w-xs mx-auto mt-3 w-full"
                    onChange={handlePackageType}
                >
                    {(packageType) => <SelectItem key={packageType.label} value={packageType.value}>{packageType.value}</SelectItem>}
                </Select>
            </div>
            <div className='w-80 gap-2 px-8 t' style={{ width: '100%'}}>
                {
                    packages?.map((r, index) => (
                        <div key = {index} className='grid grid-cols-12 mt-5 mx-2'>
                            <div className='col-span-12 sm:col-span-2'></div>
                            <CourseBox
                                packageId = {r.packageId}
                                packageName ={r.packageName}
                                description = {r.description}
                                packageTypes = {r.packageTypes}
                                licenseName = {r.licenseType==undefined||r.licenseType[0].licenseName}
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