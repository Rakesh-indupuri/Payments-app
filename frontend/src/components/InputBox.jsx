export function InputBox({title,placeholder,onChange}){
    return(
        <>
            <div className='font-medium text-slate-500 py-2 text-sm text-left'>
            {title}
            </div>
            <input onChange={onChange} placeholder={placeholder} className="p-2 w-full text-slate-500 border rounded border-slate-200" />
        </>
    )
}