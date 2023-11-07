'use client'
import useSWR from "swr";
import {transactionApi} from "@/api/transactionApi";
import {number} from "prop-types";

export function useTransaction () {
    return {
        getTransactions: (id: string) =>
            useSWR(`/Transaction?$filter=userId eq ${id}`, transactionApi.getTransaction),
    }
}