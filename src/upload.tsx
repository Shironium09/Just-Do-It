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
                <div className="flex justify-center gap-10 flex-col items-center">
                    <div className="">
                        <input
                            type="file"
                            accept="image/*"
                            className="border w-60"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter additional context..."
                            value={contextText}
                            onChange={(e) =>  setContextText(e.target.value)}
                            className="border w-60"
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    );

};