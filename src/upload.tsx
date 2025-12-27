import React, { useState, useEffect } from 'react';
import { Submit } from './submit'

export const  Upload = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [contextText, setContextText] = useState<string>("");
    const [AIresult, setAIResult] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {

        if(!e.target.files || e.target.files.length == 0){

            setSelectedFile(null);
            return;

        }

        const file = e.target.files[0];
        setSelectedFile(file);

    };

    const handleSubmit = async () => {

        if(!selectedFile){

            alert("Please upload a file first!");
            return;

        }

        setIsLoading(true);
        setAIResult("");

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('context', contextText);

        try{

            const response = await fetch('http://localhost:3000/analyze', {

                method: 'POST',
                body: formData,

            });

            const result = await response.json();
            setAIResult(result.result);
            setIsLoading(false);

        }catch(error){

            console.log("Error Submmitting: ", error);

        }

    }

    return(
        <>
        <div className="w-full flex justify-center mb-10">
            <div className="w-[85%] h-auto">
                <h1 className="text-center text-white select-none text-[2rem] mt-10">Let's Get Productive!</h1>
                <div className="flex flex-col justify-center items-center">
                    <hr className="w-[50%] border-white border-1 m-5"/>
                    <div className="w-full flex justify-center select-none">
                        <label 
                            htmlFor="dropzone-file" 
                            className="flex flex-col items-center justify-center w-100 h-50 border-2 border-dashed border-white rounded-lg cursor-pointer bg-zinc-900 hover:bg-zinc-800 hover:border-emerald-500 transition-all duration-300"
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
                                            Upload Your Schedule Here
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
                    <div className="w-full select-none flex justify-center mt-5">
                        <textarea
                            placeholder="Enter additional context... (What are the subjects, hardest subjects, etc.)"
                            value={contextText}
                            onChange={(e) => setContextText(e.target.value)}
                            className="border w-100 h-32 text-white p-3 rounded-lg bg-zinc-900 border-white focus:border-emerald-500 focus:outline-none resize-none"
                        />
                    </div>
                    <Submit
                        file={selectedFile}
                        context={contextText}
                        onClick={handleSubmit}
                        isLoading={isLoading}
                    />
                    {AIresult && (
                        <div className="w-full mt-10 mb-10 p-6 bg-zinc-900/80 border border-emerald-500 rounded-xl shadow-lg animate-fade-in">
                            <h2 className="text-xl font-bold mb-4 text-emerald-400 border-b border-zinc-700 pb-2">
                                Your Optimized Schedule
                            </h2>
                            <div className="text-white whitespace-pre-wrap font-mono leading-relaxed">
                                {AIresult}
                            </div>
                        </div>  
                    )}
                </div>
            </div>
        </div>
        </>
    );

};