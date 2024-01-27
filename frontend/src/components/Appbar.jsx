export function Appbar(){
    return(
        <div className="shadow h-14 flex justify-between">
            <div  className="flex flex-col font-semibold justify-center h-full ml-4">
                Payments App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center text-lg h-full mr-4">
                    Hello
                </div>
                <div className='flex mt-1 mr-2 justify-center h-12 w-12 rounded-full bg-slate-200 '>
                    <div className="flex flex-col justify-center h-full text-xl">
                        U
                    </div>
                </div>
            </div>
        </div>
    )
}