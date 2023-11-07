'use client'

import React, {useEffect, useState} from 'react';
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

    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()

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
                })
                console.log(respone)
            } catch (error) {
                console.log(error);
                notify("Error!",'error')
            }
        };
        fetchUser();
    };

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    return (
        <div>
            <div className='flex flex-wrap justify-center content-center ' style={{ width: '100%'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card isFooterBlurred className="w-[800px] mt-6 mb-6 text-center p-6">
                        <Spacer y='5'/>
                        <div className='mb-2 font-bold text-2xl'>Appy to mentor</div>
                        <Spacer y='7'/>
                        <div className='flex flex-wrap mx-10'>
                            <Controller
                                control={control}
                                name="Bio"
                                render={({ field: { value, onChange, ...field } }) => {
                                    return (
                                        <input
                                            {...field}
                                            value={value?.fileName}
                                            onChange={(event) => {
                                                onChange(event.target?.files[0]);
                                                onSelectFile(event)
                                            }}
                                            type="file" label="Bio"
                                            size='sm'
                                            className='mx-auto mb-2 w-11/12'
                                        />
                                    );
                                }}
                            />
                        </div>
                        {selectedFile &&  <img src={preview} /> }
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
                        <Spacer y='7'/>
                        <Button className='mx-auto w-3/5 bg-sky-400 font-bold text-l' type="submit">Register</Button>
                        <Spacer y='9'/>
                    </Card>
                </form>
            </div>
        </div>
    );
}