'use client'

import React, {useState} from 'react';
import {
    Card,
    Spacer,
    Button,
    Input,
    Link
} from '@nextui-org/react';
import {useForm, Controller} from "react-hook-form";
import {AppDispatch} from "@/redux/store";
import {userApi} from "@/api/userApi";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";

export default function MentorSignUp() {
    const router = useRouter()
    const { register, handleSubmit, control } = useForm();
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
            try {
                const respone = await userApi.registerMentor(input).then(() => {
                    notify("Apply sucessfully!", 'success')
                    router.push(`/login`)
                })
                console.log(respone)
            } catch (error) {
                console.log(error.response.data.Message);
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
                        <div className='mt-2 mb-2 font-bold text-2xl'>Sign Up</div>
                        <Spacer y='7'/>
                        <div className='flex flex-wrap mx-10'>
                            <Input
                                {...register("MentorName")}
                                isClearable
                                isRequired
                                type="text" label="Mentor Name"
                                size='sm'
                                className='mx-auto mb-2 w-5/12'
                            />
                            <Input
                                {...register("Name")}
                                isClearable
                                isRequired
                                type="text" label="Name"
                                size='sm'
                                className='mx-auto mb-2 w-5/12'
                            />
                        </div>
                        <Spacer y='4'/>
                        <div className='flex flex-wrap mx-10'>
                            <Input
                                {...register("PhoneNumber")}
                                isRequired
                                type="tel" label="Phone Number"
                                size='sm'
                                className='mx-auto mb-2 w-5/12'
                            />
                            <Input
                                {...register("Address")}
                                isClearable
                                isRequired
                                type="text" label="Address"
                                size='sm'
                                className='mx-auto mb-2 w-5/12'
                            />
                        </div>
                        <Spacer y='4'/>
                        <div className='flex flex-wrap mx-10'>
                            <Controller
                                control={control}
                                name={"Bio"}
                                render={({ field: { value, onChange, ...field } }) => {
                                    return (
                                        <input
                                            {...field}
                                            value={value?.fileName}
                                            onChange={(event) => {
                                                onChange(event.target.files[0]);
                                            }}
                                            type="file" label="Bio"
                                            size='sm'
                                            className='mx-auto mb-2 w-11/12'
                                        />
                                    );
                                }}
                            />
                        </div>
                        <Spacer y='4'/>
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
                        <Spacer y='4'/>
                        <div className='flex flex-wrap mx-10'>
                            <Input
                                {...register("Experience")}
                                isRequired
                                label="Experience"
                                size='sm'
                                className='mx-auto mb-2 w-11/12'
                            />
                        </div>
                        {registerErrorMessage!==""? (
                            <>
                                <Spacer y='3'/>
                                <div
                                    className="flex justify-center items-center bg-red-100 rounded-lg mx-auto mb-5 text-sm text-red-700 h-[50px] w-4/5"
                                    role="alert"
                                >
                                    {registerErrorMessage}
                                </div>
                                <Spacer y='1'/>
                            </>
                        ):<Spacer y='7'/>}
                        <Button className='mx-auto w-3/5 bg-sky-400 font-bold text-l' type="submit">Register</Button>
                        <Spacer y='4'/>
                        <div className='mt-2 mb-4 text-xs'>
                            Already have account? <Link href='/login' size="sm">Login here</Link>
                        </div>
                    </Card>
                </form>
            </div>
        </div>
    );
}