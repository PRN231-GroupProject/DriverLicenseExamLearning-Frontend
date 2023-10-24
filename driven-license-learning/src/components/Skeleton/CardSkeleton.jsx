import Skeleton from "react-loading-skeleton";

const CardSkeleton = (props) => {
    return (
            <Skeleton
                count={4}
                width={props.width}
                height={props.height}
                style={{margin: '10px 10px 10px 10px' }}
            />
    )
}
export default CardSkeleton;