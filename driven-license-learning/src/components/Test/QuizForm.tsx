'use client'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {
    Button,
    Chip,
    cn, Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Radio,
    RadioGroup,
    Spinner, useDisclosure
} from "@nextui-org/react";
import {useExam} from "@/hooks/useExam";
import React, {useState} from "react";
import {useForm, Controller, SubmitHandler} from "react-hook-form";
import {Input} from "@mui/material";
import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from "@/redux/features/userSlice";
import {userApi} from "@/api/userApi";
import {examApi} from "@/api/examApi";
import {toast} from "react-toastify";


type QuizForm = {
    quizID:        number,
    answerDetails: AnswerDetail[],
}

type AnswerDetail = {
    answer:     string,
    questionID: number,
}

type Result = {
    wrongAnswer:          number,
    rightAnswer:          number,
    mark:                 string,
    wrongParalysisAnswer: number,
    examStatus:           string,
}

export const QuizForm = (props) => {

    const [result, setResult] = useState<Result>()

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const form = useForm<QuizForm>({
        defaultValues: {

        },
        mode: 'onChange'
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    const {getExamFilter} = useExam()
    const {data: exam, isLoading, error,} = getExamFilter(props.licenseTypeId,props.examId)
    // console.log(exam);
    // console.log(params.licenseTypeId)
    // console.log(exam==undefined||exam[0].exams==undefined||exam[0].exams[0].questions)

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

    const onSubmit: SubmitHandler<QuizForm> = (input) => {
        const fetchSubmit = async () => {
            try {
                await examApi.postExam(input)
                    .then((r) => {
                        notify("Submit sucessfully!",'success');
                        setResult(r as any)
                        onOpen()
                    })
            } catch (error) {
                console.log(error);
                notify("Submit Failed!",'error')
            }
        };
        fetchSubmit();
    };

    if (isLoading) {
        return (
            <div className='content-center text-center mt-6'>
                <Spinner className='mt-6' />
            </div>
        )
    }

    if (error||exam.length==0) {
        return (
            <div className='content-center text-center mt-6'>
                Not found exams
            </div>
        )
    }

    return (
        <>
            <div className='w-4/5 mt-4 mb-4 mx-auto t'>
                <div className='col-span-12  sm:col-span-9 bg-slate-200 rounded-lg p-6'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register(`quizID`)}
                            type='hidden' hidden value={exam[0]?.exams[0]?.ExamId}/>
                        {
                            exam[0]?.exams[0]?.questions?.map((q,index) => (
                                <div key = {index} className='mb-6 mt-3'>
                                    <Input
                                        {...register(`answerDetails[${index}].questionID`)}
                                        type='hidden' hidden value={q.QuestionId}/>
                                    <Controller
                                        control={control}
                                        name={`answerDetails[${index}].answer`}
                                        render={({ field: { onChange, value } }) => (
                                            <RadioGroup
                                                label= {"Question "+ (index+1) + ": " +q.Title}
                                                classNames={{
                                                    base:cn(
                                                        "m-0 bg-content1 hover:bg-content2 font-semibold ",
                                                        "cursor-pointer rounded-lg gap-4 p-4 border-1 border-transparent",
                                                    )
                                                }}
                                            >
                                                <Radio onChange={onChange} isselected={value} value={q.Option1}>{q.Option1}</Radio>
                                                <Radio onChange={onChange} isselected={value} value={q.Option2}>{q.Option2}</Radio>
                                                <Radio onChange={onChange} isselected={value} value={q.Option3}>{q.Option3}</Radio>
                                                {
                                                    q.Option4!=""&&
                                                    <Radio onChange={onChange} isselected={value} value={q.Option4}>{q.Option4}</Radio>
                                                }
                                                {
                                                    q.Image!=""&&
                                                    <img src={q.Image}/>
                                                }

                                            </RadioGroup>
                                        )}
                                    />
                                </div>
                            ))
                        }
                        <Button type='submit'>Submit</Button>
                    </form>
                </div>
            </div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
            >
                <ModalContent className='h-[350px] w-[500px]'>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">Your Result</ModalHeader>
                            <ModalBody className='ml-7 mt-6'>
                                <div className='grid grid-cols-3'>
                                    <div className='col-span-2 font-semibold'>Wrong Answer:</div>
                                    <div className='font-medium'>{result?.wrongAnswer}</div>
                                </div>
                                <div className='grid grid-cols-3'>
                                    <div className='col-span-2 font-semibold'>Right Answer:</div>
                                    <div className='font-medium'>{result?.rightAnswer} </div>
                                </div>
                                <div className='grid grid-cols-3'>
                                    <div className='col-span-2 font-semibold'>Mark:</div>
                                    <div className='font-medium'>{result?.mark}</div>
                                </div>
                                <div className='grid grid-cols-3'>
                                    <div className='col-span-2 font-semibold'>Wrong Paralysis Answer:</div>
                                    <div className='font-medium'>{result?.wrongParalysisAnswer}</div>
                                </div>
                                <div className='grid grid-cols-3'>
                                    <div className='col-span-2 font-semibold'>Status:</div>
                                    <Chip className="capitalize" color={result?.examStatus=="Failed"?`danger`:`primary`} size="sm" >
                                        {result?.examStatus}
                                    </Chip>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}