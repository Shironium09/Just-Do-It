import { useState, useEffect } from 'react'

interface SubmitProps{

    file: File | null;
    context: string;
    onClick: () => void;

}

export const Submit = ({file, context, onClick}: SubmitProps) => {

    const [submitButton, updateSubmitButton] = useState<boolean>(false);



    return(
        <>
        <div className="w-full flex justify-center m-5 select-none">
            <a className="">
                <button onClick={onClick} className="bg-zinc-900 text-white border-white border font-bold cursor-pointer ps-4 pe-3 p-2 rounded-full hover:border-emerald-500 hover:bg-zinc-800 transition-all">
                    Start Analyzing
                </button>
            </a>
        </div>
        </>
    );

}