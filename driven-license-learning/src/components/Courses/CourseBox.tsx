'use client'
import CardSkeleton from "@/components/Skeleton/CardSkeleton";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button} from "@nextui-org/react";
import {useRouter} from "next/navigation";

export default function CourseBox(props) {
    const router = useRouter()
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-8 bg-gradient-to-r from-purple-500 to-pink-500">
            <CardHeader className="absolute z-10 top-0 flex-col justify-between ">
                <h4 className="text-black font-medium text-2xl">{props.packageName}</h4>
            </CardHeader>
            <CardBody className="absolute bg-white/30 h-[228px] bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                    <p className="text-black ">{props.description}</p>
                </div>
                <div>
                    <p className="text-black text-tiny">Price: {props.price} VND</p>
                </div>
                <Button className="text-tiny" color="primary" radius="full" size="sm"
                        onClick={(e) => {
                            router.push(`/courses/${props.packageId}`);
                        }}
                >
                    Learning now
                </Button>
            </CardBody>
        </Card>

    )
}