export const Balance=({value})=>{
    return(
        <div className="flex">
            <div className='font-bold text-lg ml-4 my-2'>
                Your Balance
            </div>
            <div className="flex flex-col font-semibold justify-center ml-4 text-lg">
               Rs {value}
            </div>
        </div>
    )
}