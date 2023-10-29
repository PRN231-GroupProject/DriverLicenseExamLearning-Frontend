'use client'

import React, {useState} from 'react';
import {
    Card,
    Spacer,
    Button,
    Input,
    Checkbox, Link
} from '@nextui-org/react';
import {Container, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {AppDispatch} from "@/redux/store";
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from "@/redux/features/userSlice";
import {userApi} from "@/api/userApi";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";

export default function SignUp() {
    const router = useRouter()
    const { register, handleSubmit } = useForm();
    const [registerErrorMessage, setRegisterErrorMessage] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (input) => {
        console.log(input);
        const fetchUser = async () => {
            var response;
            try {
                await userApi.register(input).then(() => (
                    router.push(`/login?alertRegister=true`))
                )
            } catch (error) {
                console.log(error.response.data.message);
                setRegisterErrorMessage(error.response.data.message)
            }
        };
        fetchUser();
    };

    return (
        <div>
            <div className='flex flex-wrap justify-center content-center h-screen bg-gradient-to-r from-purple-500 to-pink-500' style={{ width: '100%'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card isFooterBlurred className="w-[550px] h-[600px] text-center">
                        <Spacer y='5'/>
                        <div className='mt-5 mb-5 font-bold text-2xl'>Sign Up</div>
                        <Spacer y='7'/>
                        <div className='flex flex-wrap mx-10'>
                            <Input
                                {...register("name")}
                                type="text" label="Full name"
                                size='sm'
                                className='mx-auto mb-2 w-5/12'
                            />
                            <Input
                                {...register("userName")}
                                type="text" label="Username"
                                size='sm'
                                className='mx-auto mb-2 w-5/12'
                            />
                        </div>
                        <Spacer y='6'/>
                        <div className='flex flex-wrap mx-10'>
                            <Input
                                {...register("phoneNumber")}
                                type="tel" label="Telephone"
                                size='sm'
                                className='mx-auto mb-2 w-5/12'
                            />
                            <Input
                                {...register("address")}
                                type="text" label="Address"
                                size='sm'
                                className='mx-auto mb-2 w-5/12'
                            />
                        </div>
                        <Spacer y='6'/>
                        <div className='flex flex-wrap mx-10'>
                            <Input
                                {...register("email")}
                                type="email" label="Email"
                                size='sm'
                                className='mx-auto mb-2 w-11/12'
                            />
                        </div>
                        <Spacer y='6'/>
                        <div className='flex flex-wrap mx-10'>
                            <Input
                                {...register("password")}
                                type='password' label="Password"
                                size='sm'
                                className='mx-auto mb-2 w-11/12'
                            />
                        </div>
                        {registerErrorMessage!==""? (
                            <>
                                <Spacer y='4'/>
                                <div
                                    className="flex justify-center items-center bg-red-100 rounded-lg mx-auto mb-5 text-sm text-red-700 h-[50px] w-4/5"
                                    role="alert"
                                >
                                    {registerErrorMessage}
                                </div>
                                <Spacer y='2'/>
                            </>
                        ):<Spacer y='9'/>}
                        <Button className='mx-auto w-3/5 bg-sky-400 font-bold text-l' type="submit">Register</Button>
                        <Spacer y='6'/>
                        <div className='mt-1 mb-5 text-xs'>
                            Already have account? <Link href='/login' size="sm">Login here</Link>
                        </div>
                    </Card>
                </form>
            </div>
        </div>
    );
}