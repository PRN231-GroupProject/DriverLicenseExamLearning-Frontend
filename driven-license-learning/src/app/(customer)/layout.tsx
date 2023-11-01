import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Navigation from "@/components/LandingPage/Navigation";
import React from "react";

import {SkeletonTheme} from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {Providers} from "@/app/provider";
import {ToastContainer} from "react-toastify";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Driven License Learning',
    description: 'Generated by create next app',
}

export default function CustomerLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
            <div>
                <Navigation/>
                {children}
                <ToastContainer />
            </div>
    )
}
