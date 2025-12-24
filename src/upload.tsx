import React, {useState, useEffect} from 'react';

export const  Upload = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [contextText, setContextText] = useState<string>("");

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(!e.target.files || e.target.files.length == 0){

            setSelectedFile(null);
            return;

        }

        const file = e.target.files[0];
        setSelectedFile(file);

    };

    return(
        <>
        <div className="w-full flex justify-center">
            <div className="w-[85%] h-auto">
                <h1 className="text-center text-white select-none text-[2rem] m-10">Let's Get Productive!</h1>
                <div className="flex justify-center items-center bg-black">
                    <div className="w-[40%] flex justify-center">
                        <label 
                            htmlFor="dropzone-file" 
                            className="flex flex-col items-center justify-center w-80 h-52 border-2 border-dashed border-white rounded-lg cursor-pointer bg-zinc-900 hover:bg-zinc-800 hover:border-emerald-500 transition-all duration-300"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {selectedFile ? (
                                    <>
                                        <svg className="w-10 h-10 mb-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <p className="mb-2 text-sm font-semibold text-white text-center px-4 break-all">
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-xs text-slate-400">Click to change</p>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-10 h-10 mb-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                        </svg>
                                        <p className="mb-2 text-sm font-semibold text-white">
                                            Upload Feedback Data
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            Click to browse files
                                        </p>
                                    </>
                                )}
                            </div>
                            <input 
                                id="dropzone-file" 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={onSelectFile}
                            />
                        </label>
                    </div>
                    <div className="w-[60%]">
                        <input
                            type="text"
                            placeholder="Enter additional context..."
                            value={contextText}
                            onChange={(e) =>  setContextText(e.target.value)}
                            className="border w-[50%] h-full text-white p-1 rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    );

};