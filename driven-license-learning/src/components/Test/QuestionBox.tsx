'use client'
import {
    cn,
    Radio,
    RadioGroup
} from "@nextui-org/react";
import {useRouter} from "next/navigation";
import {selectUser} from "@/redux/features/userSlice";
import {AppDispatch} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import React from "react";

export const QuestionBox = React.forwardRef((props, ref) => {
    // You can add any UI inside Loading, including a Skeleton.
    const [selected, setSelected] = React.useState("");
    const handleChange = (e) => {
        setSelected(e)
        console.log(e)
    }
    return (
        <RadioGroup
            {...props.props(`answerDetails[${props.index}].answer`)}
            label= {"Question "+ (props.index+1) + ": " +props.Title}
            value={selected}
            onValueChange={handleChange}
            classNames={{
                base:cn(
                    "m-0 bg-content1 hover:bg-content2 ",
                    "cursor-pointer rounded-lg gap-4 p-4 border-1 border-transparent",
                )
            }}
        >
            <Radio value={props.Option1}>{props.Option1}</Radio>
            <Radio value={props.Option2}>{props.Option2}</Radio>
            <Radio value={props.Option3}>{props.Option3}</Radio>
            {
                props.Option4!=null&&
                <Radio value={props.Option4}>{props.Option4}</Radio>
            }

        </RadioGroup>
    )
})