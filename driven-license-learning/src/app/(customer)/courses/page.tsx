'use client'
import {CourseBox} from "@/components/Courses/CourseBox";
import {usePackage} from "@/hooks/usePackage";
import React, { useState} from "react";
import { Select, SelectItem} from "@nextui-org/react";
import {useForm} from "react-hook-form";

export default function CoursesPage() {

    const [ licenseType, setLicenseType ] = useState([
        {
            key : "",
            value : "None",
        },
        {
            key : "A1",
            value : "A1",
        },
        {
            key : "A2",
            value : "A2",
        },
        {
            key : "B1",
            value : "B1",
        }
    ])
    const [ licenseName, setLicenseName ] = useState("")
    const { getPackages, getPackageByLicenseType } = usePackage();
    const {data: packages, error} = licenseName==""?getPackages():getPackageByLicenseType(licenseName);

    const form = useForm();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    const handlePackageType = (e) => {
        setLicenseName(e.target.value);
        console.log(licenseName)
    };

    return (
        <>
            <div className='content-center text-center'>
                <Select
                    items={licenseType}
                    label="Package Types"
                    placeholder="Select a package"
                    className="max-w-xs mx-auto mt-3 w-full"
                    onChange={handlePackageType}
                >
                    {(packageType) => <SelectItem key={packageType.key} value={packageType.value}>{packageType.value}</SelectItem>}
                </Select>
            </div>
            <div className='w-80 gap-2 px-8 t' style={{ width: '100%'}}>
                {
                    packages?.map((r, index) => (
                        <div key = {index} className='grid grid-cols-12 mt-5 mx-2'>
                            <div className='col-span-12 sm:col-span-2'></div>
                            <CourseBox
                                {...register(`i${index}`)}
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