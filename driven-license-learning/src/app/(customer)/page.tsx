'use client'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {usePackage} from "@/hooks/usePackage";
import Carousel from "@/components/LandingPage/Carousel";
import PackageCard from "@/components/LandingPage/Card";
import { CourseBox } from "@/components/Courses/CourseBox";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface Package {
    packageId: number;
    packageName: string;
    description: string;
    price: number;
    numberOfKmOrDays: number;
    licenseType: { licenseName: string }[]; // Specify the correct data structure
    packageTypes: { packageTypeName: string }[]; // Specify the correct data structure
  }

export default function HomePage() {

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
        <main>
            <div className='gap-2 px-8'>
                <div className="flex w-full justify-center items-center">
                    <Carousel/>
                </div>
                <div className="py-5">
                    <h3 className="font-bold text-3xl text-center">Trung tâm dạy lái xe hàng đầu tại Thành phố Hồ Chí Minh</h3>
                    <hr className="my-6 border-b-1 border-orange-300 w-1/4   mx-auto" />
                    <div className="px-24 py-3 ">
                        <p>Trường Dạy Lái Xe An Toàn trực thuộc Sở LĐ – TBXH và Sở GTVT Tp.HCM được thành lập theo quyết định số 52/TCĐBVNQLPT&NL của Tổng cục đường bộ VN ký ngày 06/06/2006.</p>
                        <p>Qua hơn 10 năm kinh nghiệm và dẫn đầu trong đào tạo lái xe, chúng tôi tự hào đã đào tạo hàng ngàn học viên học lái xe tại TPHCM và các tỉnh thành lân cận sở hữu bằng lái xe môtô, ôtô, xe máy… chất lượng với chi phí cạnh tranh nhất, cùng kỹ năng lái xe lành nghề, tự tin trên mọi cung đường. Dạy Lái Xe An Toàn – Nơi học lái xe ôtô giá rẻ, chất lượng, uy tín hàng đầu ở TPHCM. Học lái xe ôtô B2 tại TPHCM đảm bảo đậu 95% với chi phí trọn gói không phát sinh trong quá trình học.</p>
                    </div>
                </div>
                <div className="bg-[#241744] grid grid-cols-4">
                    <div className="border-r border-[#B28F5A] p-2 text-center py-7">
                        <h1 className="text-5xl font-bold text-[#B28F5A] ">12+</h1>
                        <p className="text-[#B28F5A]">NĂM HOẠT ĐỘNG</p>
                    </div>
                    <div className="border-r border-[#B28F5A] p-2 text-center py-7">
                        <h1 className="text-5xl font-bold text-[#B28F5A] ">1200+</h1>
                        <p className="text-[#B28F5A]">HỌC VIÊN</p>
                    </div>
                    <div className="border-r border-[#B28F5A] p-2 text-center py-7">
                        <h1 className="text-5xl font-bold text-[#B28F5A] ">42</h1>
                        <p className="text-[#B28F5A]">XE TẬP LÁI</p>
                    </div>
                    <div className="p-2 text-center py-7">
                        <h1 className="text-5xl font-bold text-[#B28F5A] ">2</h1>
                        <p className="text-[#B28F5A]">SÂN TẬP</p>
                    </div>
                </div>
                <div className="py-5">
                    <h3 className="font-bold text-3xl text-center">Các khóa học lái xe (tuyển sinh hàng tháng)</h3>
                    <hr className="my-6 border-b-1 border-orange-300 w-1/4 mx-auto" />
                    <div className="grid grid-cols-3 gap-7">
                        {packages?.map((r, index) => (
                        <div key = {index}>
                            <div></div>
                            <PackageCard
                                packageId = {r.packageId}
                                name ={r.packageName}
                                description = {r.description}
                                numberOfKmOrDays={r.numberOfKmOrDays}
                                packageTypes = {r.packageTypes}
                                licenseType={r.licenseType}
                                price = {r.price}
                            />
                            <div className='col-span-12 sm:col-span-2'></div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </main>
    )
}