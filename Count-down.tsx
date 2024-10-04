#! /usr/bin/env node

"use client";
// import statement
import {useState, useRef, useEffect, ChangeEvent} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";


export default function Countdown() {
// state and referencesn
const[duration, setDuration]= useState<number | string> ("");
const[timeLeft, setTimeLeft ] = useState<number>(0);
const[isActive, setIsActive] = useState<boolean>(false);
const[isPaused, setIsPaused ] = useState<boolean>(false);
const timeRef = useRef<NodeJS.Timeout | null> (null);


// make function for time control
const handleSetDuration = (): void => {
    if(typeof duration === "number" && duration>0){
        setTimeLeft(duration);
        setIsActive(false);
        setIsPaused(false);
        if(timeRef.current){
            clearInterval(timeRef.current)
        }
    }
}

// make function handle countdown
const handleStart = (): void =>{
    if(timeLeft > 0){
        setIsActive(true);
        setIsPaused(false);
    }
}


// make function to handle paused
const handlpaused = () : void=> {
    if(isActive){
        setIsPaused(true);
        setIsActive(false);
        if(timeRef.current){
            clearInterval(timeRef.current);
        }
    }
}

// make function for handle reset
const handleReset = () :void =>{
    setIsActive(false);
    setIsActive(false);
    setTimeLeft(typeof duration ===  "number" ? duration : 0);
    if(timeRef.current){
        clearInterval(timeRef.current);
    }
}

// use effects for countdown logic
useEffect(() =>{
    if (isActive && !isPaused){
        timeRef.current = setInterval(()=>{
            setTimeLeft((prevTime)=> {
                if(prevTime <= 1){
                    clearInterval(timeRef.current!);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    }
    return ()=> {
        if(timeRef.current){
            clearInterval(timeRef.current);
        }
    };
},[isActive, isPaused]);

// write helper function 
const formatTime = (time: number): string =>{
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2,"0")}: ${String(seconds).padStart(2,"0")}`
}

const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
}


// jsx return statement

return (
    <div className = "flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        {/* timer box container 8*/}
        <div className = "bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
            {/*title of the countdown timer*/}
            <h1 className = "text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
                Countdown timer
            </h1>
            {/*input and set botton container */}
            <div className = "flex items-center mb-6">
                <Input 
                type= "number"
                id="duration"
                placeholder="Enter duration in seconds"
                value={duration}
                onChange={handleDurationChange}
                className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
                <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
                    set 
                    </Button>
            </div>
            {/*desplayed the formatted time left */}
            <div className="text-6xl font-bold text-d-gray-800 dark:text-gray-200 mb-8 text-center">
                {formatTime(timeLeft)}
            </div>

            {/*botton to start, pause and reset the timer */}
            <div className="flex justify-center gap-4">
                <Button
                onClick={handleStart}
                variant="outline"
                className="text-gray-800 dark:text-gray-200"
                >
                    {isPaused ? "Resume" : "Start"}
                    </Button>
                    <Button
                    onClick={handlpaused}
                    variant="outline"
                    className="text-gray-800 dark:text-gray-200 "
                    >
                    pause
                    </Button>

                    <Button
                    onClick={handleReset}
                    variant="outline"
                    className="text-gray-800 dark:text-gray-200"
                    >
                        Reset
                    </Button>
            </div>
        </div>
    </div>
        
);
}
