"use client";

import { startOfMonth, endOfMonth, eachDayOfInterval, format } from "date-fns";

export function MiniMonthView() {
  const today = new Date();
  const days = eachDayOfInterval({
    start: startOfMonth(today),
    end: endOfMonth(today),
  });

  return (
    <div className="grid grid-cols-7 gap-1 text-center text-xs">
      {days.map((day, i) => {
        const isToday =
          format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
        return (
          <div
            key={i}
            className={`p-1 rounded-md ${
              isToday
                ? "bg-blue-600 text-white"
                : "hover:bg-accent text-muted-foreground"
            }`}
          >
            {format(day, "d")}
          </div>
        );
      })}
    </div>
  );
}
