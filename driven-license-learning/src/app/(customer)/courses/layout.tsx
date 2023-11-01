import React from "react";
import {Suspense} from "react";
import Loading from "@/app/(customer)/courses/loading";
import {ToastContainer} from "react-toastify";
export default function CoursesLayout({
                                            children, // will be a page or nested layout
                                        }: {
    children: React.ReactNode
}) {
    return (
        <section>
            <Suspense fallback={<Loading/>}>
                {children}
            </Suspense>
        </section>
    )
}