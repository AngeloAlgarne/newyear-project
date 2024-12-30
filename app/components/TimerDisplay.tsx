import React from 'react';

interface TimerDisplayProps {
  value: number | string; // 'value' can be a number or a string
  label: string;          // 'label' should be a string
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ value, label }) => {
    return (
        <div className="mx-4 font-[Poppins]">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl ms-2">{value}</div>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl ms-2">{label}{value != 1 ? "s":""}</div>
        </div>
    );
};

export default TimerDisplay;
