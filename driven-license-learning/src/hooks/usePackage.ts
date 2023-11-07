'use client'
import useSWR from "swr";
import {packageApi} from "@/api/packageApi";

export function usePackage () {
    return {
        getPackages: () =>
            useSWR("/package", packageApi.getPackage),

        getPackageById: (id: bigint) =>
            useSWR(`/package?$filter=packageId%20eq%20${id}`, packageApi.getPackage),

        getPackageByPackageType: (id: number) =>
            useSWR(`/package?$filter=PackageTypeId%20eq%20${id}`, packageApi.getPackage),

        getPackageByLicenseType: (name: string) =>
            useSWR(`/package?$filter=licenseType/any(lt: lt/licenseName eq '${name}')`, packageApi.getPackage),

        getPackagesFilter: (name: string) =>
            useSWR(
                name===""?"/package":`/package?$filter=licenseType/any(lt: lt/licenseName eq '${name}')`, packageApi.getPackage),

    }
}