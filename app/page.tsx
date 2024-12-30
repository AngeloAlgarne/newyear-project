"use client"; // Add this directive for client component

import { useEffect, useState, useRef } from "react";
import confetti from "canvas-confetti";

import TimerDisplay from "./components/TimerDisplay";


const DEBUG =  true;


const TARGET_DATETIME = getCurrentTarget(); 
const TARGET_YEAR = TARGET_DATETIME.getFullYear();


function getCurrentTarget() {
  let targetDate = "2024-12-31"; // default is debug values
  let targetTime = "02:15:00";
  if (!DEBUG) {
    const now = new Date();
    targetDate = now.getFullYear() + "-01-01";
    targetTime = "00:00:00";
  }
  return new Date(targetDate + "T" + targetTime + "+08:00"); // Asia/Manila tz
}


function targetDifference() {
  const now = new Date();
  const difference = TARGET_DATETIME.getTime() - now.getTime();
  return difference
}


export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [showFireworks, setShowFireworks] = useState(targetDifference() <= 0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Countdown settings
  useEffect(() => {
    const updateCountdown = () => {
      const difference = targetDifference();
      if (difference <= 0) {
        if (!showFireworks) {
          setTimeLeft(0);
          setShowFireworks(true);
        }
      } else {
        setTimeLeft(difference);
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, [showFireworks]);

  // Fireworks/Confetti settings
  useEffect(() => {
    if (showFireworks && canvasRef.current) {
      const canvas = canvasRef.current;

      const seconds = 2678400; // Fireworks duration (31 days lol)
      const duration = seconds * 1000;
      const end = Date.now() + duration;

      const interval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(interval);
        } else {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: Math.random(), y: Math.random() },
          });
        }
      }, 100);
    }
  }, [showFireworks]);

  // Format values
  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
      days,
      hours: hours % 24,
      minutes: minutes % 60,
      seconds: seconds % 60,
    };
  };

  const { days, hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      {showFireworks ? (
        <>
          <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full"/>
          <div className="flex flex-col text-center">
            <h1 className="text-7xl font-extrabold font-[Poppins] uppercase">Happy New Year!</h1>
            <h1 style={{fontSize: "18rem", marginTop: "-4rem"}} className="font-extrabold font-[Poppins]">{TARGET_YEAR}</h1>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-[Poppins] uppercase">{TARGET_YEAR} Count Down</h1>
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-8 font-[Poppins] uppercase tracking-widest">Philippines {DEBUG ? "(Test)" : ""}</h3>
          <div className="font-mono flex flex-row justify-self-center">
            <TimerDisplay value={days} label="day" />
            <TimerDisplay value={hours} label="hour" />
            <TimerDisplay value={minutes} label="minute" />
            <TimerDisplay value={seconds} label="second" />
          </div>
        </div>
      )}
    </div>
  );
}
