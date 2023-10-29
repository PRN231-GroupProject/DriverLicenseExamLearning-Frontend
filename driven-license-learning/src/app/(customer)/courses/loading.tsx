import Skeleton from "react-loading-skeleton";
import CardSkeleton from '@/components/Skeleton/CardSkeleton'

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <CardSkeleton width='80%' height='200px' />
    )
}