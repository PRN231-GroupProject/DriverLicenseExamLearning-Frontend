'use client'
import {CourseBox} from "@/components/Courses/CourseBox";
import {usePackage} from "@/hooks/usePackage";
import React, { useState} from "react";
import { Select, SelectItem} from "@nextui-org/react";
import {useForm} from "react-hook-form";

export default function CoursesPage() {

    
    const [ packageTypes, setPackageTypes ] = useState([
        {
            key : 0,
            value : "None",
        },
        {
            key : 1,
            value : "Km",
        },
        {
            key : 2,
            value : "Days",
        }
    ])
    const [ packageTypeId, setPackageTypeId ] = useState(0)
    const { getPackages, getPackageByPackageType } = usePackage();
    const {data: packages, error} = packageTypeId==0?getPackages():getPackageByPackageType(packageTypeId);

    const form = useForm();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    const handlePackageType = (e) => {
        setPackageTypeId(e.target.value);
    };

    return (
        <>
            <div className='content-center text-center'>
                <Select
                    items={packageTypes}
                    label="Package Types"
                    placeholder="Select a package"
                    className="max-w-xs mx-auto mt-3 w-full"
                    onChange={handlePackageType}
                >
                    {(packageType) => <SelectItem key={packageType.key} value={packageType.key}>{packageType.value}</SelectItem>}
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