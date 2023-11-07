"use client";
import Link from "next/link";
import React from "react";
import ManCity from "../../../public/banner-2.jpg";
import Image from "next/image";

type packageList = {
  packageId: number;
  name: string;
  price: number;
  numberOfKmOrDays: number;
  description: string;
  licenseType: [
    {
      licenseName: string;
    },
  ];
  packageTypes: [
    {
      packageTypeName: string;
      status: string;
    },
  ];
};
export default function PackageCard({
  packageId,
  name,
  price,
  numberOfKmOrDays,
  description,
  licenseType,
  packageTypes,
}: packageList) {
  return (
    <div className="flex flex-col shadow-lg">
      <Link href={`package/?filter=packageId%20eq%20${packageId}`}>
        <div className="hover:text-amber-600">
          <Image src={ManCity} alt="Hello" />
          <h1 className="text-2xl font-bold px-3 pt-3">{name}</h1>
        </div>
      </Link>
      <div className="p-3">
            <p>Mô tả: {description}</p>
            <p>
                Thực hiện trong: {numberOfKmOrDays}{" "}
                {packageTypes.map((packageType, index) => (
                <span key={index}> {packageType.packageTypeName}</span>
                ))}
                
            </p>
            <p>
                {licenseType.map((licenseType, index) => (
                <span key={index}>Bằng lái: {licenseType.licenseName}</span>
                ))}
            </p>
            <p className="flex justify-end px-5 text-orange-700">{price.toLocaleString()} VND</p>
        </div>
    </div>
  );
}
