'use client'
import React, {useState} from "react";
import {
    Chip,
    Select,
    SelectItem,
    Spinner,
    Table,
    TableBody, TableCell,
    TableColumn,
    TableHeader, TableRow,
    Tooltip
} from "@nextui-org/react";
import { IconEye } from '@tabler/icons-react';
import {useRouter, useSearchParams} from "next/navigation";
import {useExam} from "@/hooks/useExam";

type TProp = {
    label?: number;
    value?: string;
    description?: string;
}

export default function HistoryExamPage() {
    const [ licenseType, setLicenseType ] = useState<TProp[]>([
        {
            label : 0,
            value : "None",
            description: "",
        },
        {
            label : 1,
            value : "A1",
            description: "",

        },
        {
            label : 2,
            value : "A2",
            description: "",
        },
        {
            label : 3,
            value : "B1",
            description: "",

        }
    ])

    const router = useRouter()
    const searchParams = useSearchParams()

    const [ licenseID, setLicenseID ] = useState(searchParams.get('licenseID')?searchParams.get('licenseID'):0)

    const { getExamHistoryFilter } = useExam()
    const {data: exams, isLoading: isLoadingExams, error: errorExams} = getExamHistoryFilter(licenseID);
    console.log(exams)
    console.log(licenseID)

    const handlePackageType = (e) => {
        setLicenseID(e.target.value)
        router.push(`?licenseID=${e.target.value}`)
    };

    const columns= [
        {name: "Exam Result Id", uid: "examResultId"},
        {name: "Attempt Number", uid: "attemptNumber"},
        {name: "Date", uid: "date"},
        {name: "Actions", uid: "Actions"},
    ];

    const renderCell = React.useCallback((transaction, columnKey) => {
        const cellValue = transaction[columnKey];
        switch (columnKey) {
            case "examResultId":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "attemptNumber":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "date":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "Actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Detail">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <button onClick={() => {
                                    router.push(`/history-exam/${transaction.examResultId}`)
                                }}>
                                    <IconEye/>
                                </button>
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    if (isLoadingExams) {
        return (
            <div className='content-center text-center mt-6'>
                <Spinner className='mt-6' />
            </div>
        )
    }

    if (errorExams) {
        return (
            <div className='content-center text-center mt-6'>
                Not found history
            </div>
        )
    }

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
                    {(packageType) => <SelectItem key={packageType.label} value={packageType.label}>{packageType.value}</SelectItem>}
                </Select>
            </div>
            <div className='w-4/5 mx-auto mt-3 mb-3'>
                <div className='text-center mb-3 font-semibold text-2xl'>
                    My Exams History
                </div>
                {
                    exams!==undefined&&exams.length!=0?exams.map((e,index) => (
                        <div key={index}>
                            <div>{e.examName}:</div>
                            <Table aria-label="Example table with custom cells" >
                                <TableHeader columns={columns as any}>
                                    {(column) => (
                                        <TableColumn key={column.uid}>
                                            {column.name}
                                        </TableColumn>
                                    )}
                                </TableHeader>
                                <TableBody items={e.details as T[]} emptyContent={"No rows to display."}>
                                    {(item) => (
                                        <TableRow key={item.examResultId}>
                                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        )
                    ):<div>Not Found</div>
                }
            </div>
        </>
    )
}