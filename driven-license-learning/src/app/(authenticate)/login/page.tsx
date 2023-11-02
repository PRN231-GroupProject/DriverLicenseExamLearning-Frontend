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
import { IconEyeOff, IconEye } from '@tabler/icons-react';
import {userApi} from "@/api/userApi";
import { useState } from "react";
import {useRouter, useSearchParams} from 'next/navigation'
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from '@/redux/features/userSlice'
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/redux/store";
import {toast} from "react-toastify";

export default function Login() {

    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const router = useRouter()
    const searchParams = useSearchParams()
    const { register, handleSubmit } = useForm();
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    console.log(searchParams.get('alertRegister'))
    const [alertRegister, setAlertRegister] = useState(
        searchParams.get('alertRegister')!==null? true:false
    );

    const dispatch = useDispatch<AppDispatch>();

    const notify = React.useCallback((message,type) => {
        toast[type](message,{
            position: "top-right",
            autoClose: 5000,// Set it to false directly
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
        });
    }, []);

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
                        notify("Login sucessfully!",'success');
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
            <div className='flex flex-wrap justify-center content-center h-screen' style={{ width: '100%'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card isFooterBlurred className="w-[450px] h-[500px] text-center">
                        <Spacer y='5'/>
                        <div className='mt-5 mb-5 font-bold text-2xl'>Sign in</div>
                        <Spacer y='10'/>
                        <Input
                            {...register("email")}
                            isClearable
                            isRequired
                            bordered
                            type="email" label="Email"
                            className='mx-auto mb-5 w-4/5'
                        />
                        <Spacer y='3'/>
                        <Input
                            {...register("password")}
                            isRequired
                            bordered
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                    {isVisible ? (
                                        <IconEye className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <IconEyeOff  className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                            label="Password"
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
                        <div className='mt-1 mb-2 text-xs'>
                            Not have account yet? <Link className='text-xs' href='/signup' size="sm">Signup here</Link>
                        </div>
                        <div className='mt-1 mb-5 text-xs'>
                            You want to become a mentor? <Link className='text-xs' href='/mentor-signup' size="sm">Apply here</Link>
                        </div>
                    </Card>
                </form>
            </div>
        </div>
    );
}