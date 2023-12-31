'use client'

import React, {useState} from 'react';
import {
    Card,
    Spacer,
    Button,
    Input,
    Link
} from '@nextui-org/react';
import { IconEyeOff, IconEye } from '@tabler/icons-react';
import {useForm} from "react-hook-form";
import {AppDispatch} from "@/redux/store";
import {userApi} from "@/api/userApi";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";

export default function SignUp() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const router = useRouter()
    const { register, handleSubmit } = useForm();
    const [registerErrorMessage, setRegisterErrorMessage] = useState("");
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
            var response;
            try {
                await userApi.register(input).then(() => {
                    notify("Register sucessfully!", 'success')
                    router.push(`/login`)
                })
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
                                isClearable
                                isRequired
                                type="text" label="Full name"
                                size='sm'
                                className='mx-auto mb-2 w-5/12'
                            />
                            <Input
                                {...register("userName")}
                                isClearable
                                isRequired
                                type="text" label="Username"
                                size='sm'
                                className='mx-auto mb-2 w-5/12'
                            />
                        </div>
                        <Spacer y='6'/>
                        <div className='flex flex-wrap mx-10'>
                            <Input
                                {...register("phoneNumber")}
                                isRequired
                                type="tel" label="Telephone"
                                size='sm'
                                className='mx-auto mb-2 w-5/12'
                            />
                            <Input
                                {...register("address")}
                                isClearable
                                isRequired
                                type="text" label="Address"
                                size='sm'
                                className='mx-auto mb-2 w-5/12'
                            />
                        </div>
                        <Spacer y='6'/>
                        <div className='flex flex-wrap mx-10'>
                            <Input
                                {...register("email")}
                                isClearable
                                isRequired
                                type="email" label="Email"
                                size='sm'
                                className='mx-auto mb-2 w-11/12'
                            />
                        </div>
                        <Spacer y='6'/>
                        <div className='flex flex-wrap mx-10'>
                            <Input
                                {...register("password")}
                                isRequired
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                        {isVisible ? (
                                            <IconEye className="text-xl text-default-400 pointer-events-none" />
                                        ) : (
                                            <IconEyeOff  className="text-xl text-default-400 pointer-events-none" />
                                        )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                                label="Password"
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