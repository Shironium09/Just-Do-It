interface SubmitProps{

    file: File | null;
    context: string;
    onClick: () => void;
    isLoading: boolean;

}

export const Submit = ({file, context, onClick, isLoading}: SubmitProps) => {

    return(
        <>
        <div className="w-full flex justify-center m-5 select-none">
            <a className="">
                <button 
                    onClick={onClick} 
                    className={`
                    text-white border border-white font-bold ps-4 pe-3 p-2 rounded-full transition-all
                    ${isLoading 
                        ? "bg-zinc-600 cursor-not-allowed opacity-50"
                        : "bg-zinc-900 cursor-pointer hover:border-emerald-500 hover:bg-zinc-800"
                    }
                `}                
                >
                {isLoading ? "Generating..." : "Start Analyzing"}
                </button>
            </a>
        </div>
        </>
    );

}