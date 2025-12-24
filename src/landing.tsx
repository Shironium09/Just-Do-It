import Typewriter from "typewriter-effect";

function Landing(){


    return(
    <>
        <div className="w-full h-85 text-center select-none">
            <div className="h-full flex flex-col items-center justify-center">
                <h1 className="text-[6rem] text-white font-bold">JUST DO IT</h1>
                <h1 className="text-[2rem] text-white">
                    <Typewriter
                        options={{
                            strings: [
                                "AI Assisted Time Management Tool",
                                "Better Management of Time",
                                "Be More Productive Starting Now"
                            ],
                            autoStart: true,
                            loop: true,
                            delay: 30,
                            deleteSpeed: 30,
                        }}
                    />
                </h1>
            </div>
        </div>
    </>)

}

export default Landing;