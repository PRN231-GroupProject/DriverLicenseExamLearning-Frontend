'use client'
export default function ProfilePage({ params }: { params: { userId: bigint } }) {

    return (
        <>
            <div className='w-4/5 gap-2 grid grid-cols-12 grid-rows-3 px-8 mt-4 mb-4 mx-auto t'>
                <div className='col-span-12 row-span-3 sm:col-span-9 bg-slate-200 rounded-lg '></div>
                <div className='col-span-12 sm:col-span-3 h-80 bg-slate-200 rounded-lg'></div>
            </div>
        </>
    )
}