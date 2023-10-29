'use client'

import React from 'react';
import {useForm} from "react-hook-form";
import {
    Card,
    Spacer,
    Button,
    Input,
    Link
} from '@nextui-org/react';
import {Alert, Snackbar} from "@mui/material"
import {userApi} from "@/api/userApi";
import { useState } from "react";
import {useRouter, useSearchParams} from 'next/navigation'
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from '@/redux/features/userSlice'
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";

export default function Login() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const { register, handleSubmit } = useForm();
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    console.log(searchParams.get('alertRegister'))
    const [alertRegister, setAlertRegister] = useState(
        searchParams.get('alertRegister')!==null? true:false
    );

    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (input) => {
        console.log(input);
        const fetchUser = async () => {
            try {
                dispatch(USER_LOGIN_REQUEST());
                await userApi.login(input)
                    .then((r) => {
                        console.log(r.accessToken)
                        localStorage.setItem("token", JSON.stringify(r.accessToken));
                        dispatch(USER_LOGIN_SUCCESS(r));
                        router.push("/")
                    })
            } catch (error) {
                console.log(error.response.data.msg);
                setLoginErrorMessage(error.response.data.msg)
            }
        };
        fetchUser();
    };

    const handleClose = (event, reason) => {
        console.log(reason);
        if (reason === "clickaway") {
            return;
        }
        setAlertRegister(false);
    };

    return (
        <div>
            {alertRegister && (
                <Snackbar
                    open={alertRegister}
                    autoHideDuration={4000}
                    onClose={handleClose}
                >
                    <Alert
                        severity="success"
                        sx={{
                            fontSize: "18px",
                            right: 40,
                            bottom: 40,
                            position: "fixed",
                        }}
                    >
                        Register success!
                    </Alert>
                </Snackbar>
            )}
            <div className='flex flex-wrap justify-center content-center h-screen bg-gradient-to-r from-purple-500 to-pink-500' style={{ width: '100%'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card isFooterBlurred className="w-[450px] h-[500px] text-center">
                        <Spacer y='5'/>
                        <div className='mt-5 mb-5 font-bold text-2xl'>Sign in</div>
                        <Spacer y='10'/>
                        <Input
                            {...register("email")}
                            clearable
                            bordered
                            type="email" label="Email"
                            className='mx-auto mb-5 w-4/5'
                        />
                        <Spacer y='3'/>
                        <Input
                            {...register("password")}
                            clearable
                            bordered
                            type='password' label="Password"
                            className='mx-auto mb-5 w-4/5'
                        />
                        {loginErrorMessage!==""? (
                            <>
                                <div
                                    className="flex justify-center items-center bg-red-100 rounded-lg mx-auto mb-5 text-sm text-red-700 h-[50px] w-4/5"
                                    role="alert"
                                >
                                    {loginErrorMessage}
                                </div>
                                <Spacer y='5'/>
                            </>
                        ):<Spacer y='10'/>}

                        <Button className='mx-auto mt-2 w-4/5 bg-sky-400 font-bold text-l' type="submit">Login</Button>
                        <Spacer y='5'/>
                        <div className='mt-1 mb-5 text-xs'>
                            Not have account yet? <Link href='/signup' size="sm">Signup here</Link>
                        </div>
                    </Card>
                </form>
            </div>
        </div>
    );
}