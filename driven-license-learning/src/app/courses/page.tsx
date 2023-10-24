import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import CourseBox from "@/components/Courses/CourseBox";

export default function CoursesPage() {
    return (
        <>
            <div className='w-80 gap-2 grid grid-cols-12 grid-rows-2 px-8 mt-3 mx-1 t' style={{ width: '100%'}}>
                <div className='col-span-12 sm:col-span-1'></div>
                <CourseBox />
                <div className='col-span-12 sm:col-span-1'></div>
            </div>
        </>
    )
}