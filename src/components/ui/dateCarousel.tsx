"use client";

import React, { useState } from "react";
import { format, addDays, subDays } from "date-fns";

export default function DateCarousel({
  onDateSelect,
}: {
  onDateSelect: (date: string) => void;
}) {
  const today = new Date();
  const [centerDate, setCenterDate] = useState(today);

  // Generate 9 days window (4 before, today, 4 after)
  const dates = Array.from({ length: 9 }, (_, i) =>
    addDays(centerDate, i - 4)
  );

  const handlePrev = () => {
    const newCenter = subDays(centerDate, 1);
    setCenterDate(newCenter);
    onDateSelect(format(newCenter, "yyyy-MM-dd"));
  };

  const handleNext = () => {
    const newCenter = addDays(centerDate, 1);
    setCenterDate(newCenter);
    onDateSelect(format(newCenter, "yyyy-MM-dd"));
  };

  return (
    <div className="w-full py-4">
      {/* Month Title */}
      <h2 className="text-center text-base sm:text-lg md:text-xl font-semibold mb-3">
        {format(centerDate, "MMMM yyyy")}
      </h2>

      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold text-4xl cursor-pointer"
        >
          &lt;
        </button>

        {/* Dates Row */}
        <div className="flex flex-1 justify-center gap-1 sm:gap-2 overflow-x-auto scrollbar-hide">
          {dates.map((date, index) => {
            const formatted = format(date, "EEE d");
            const isToday =
              format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
            const isCenter = index === 4; // middle element

            return (
              <button
                key={formatted + index}
                onClick={() => {
                  setCenterDate(date);
                  onDateSelect(format(date, "yyyy-MM-dd"));
                }}
                className={`flex-1 text-gray-800 min-w-[70px] max-w-[100px]  py-1.5 sm:py-2 px-3 sm:px-5 text-xs sm:text-sm font-semibold transition text-center ${
                  isCenter || isToday
                    ? "border-b-4 border-b-primary"
                    : "bg-gray-100 hover:bg-gray-200 rounded-lg"
                }`}
              >
                {formatted}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold text-4xl cursor-pointer"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
