"use client";

import { startOfWeek, addDays, format } from "date-fns";
import { CalendarEvent } from "./calender-event";
import { Dispatch, SetStateAction } from "react";

type Props = {
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
};


export function CalendarGrid({selectedDate, setSelectedDate}:Props) {
  const start = startOfWeek(selectedDate!, { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  return (
    <div className="flex-1 overflow-auto bg-white">
      {/* Week Days Header */}
      <div className="grid grid-cols-7 border-b text-sm text-center font-medium text-muted-foreground">
        {days.map((day, i) => (
          <div key={i} className="p-2">
            {format(day, "EEE dd")}
          </div>
        ))}
      </div>

      {/* Time Slots */}
      <div className="grid grid-cols-7 divide-x h-[calc(100vh-120px)]">
        {days.map((_, i) => (
          <div key={i} className="relative border-l">
            {/* Example Event */}
            {i === 1 && (
              <CalendarEvent
                title="Team Sync"
                time="09:00 - 10:00"
                top="20%"
                height="10%"
              />
            )}
            {i === 3 && (
              <CalendarEvent
                title="AI Project Review"
                time="14:00 - 15:30"
                top="55%"
                height="12%"
                color="bg-green-500"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
