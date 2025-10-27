"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { format, addWeeks, subWeeks } from "date-fns";

export function CalendarHeader() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
  const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));

  return (
    <div className="flex justify-between items-center border-b bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <Button size="icon" variant="ghost" onClick={prevWeek}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={nextWeek}>
          <ChevronRight className="w-4 h-4" />
        </Button>
        <h2 className="text-lg font-semibold ml-2">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <Button variant="outline" className="ml-4">Today</Button>
      </div>

      <Button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
        <Plus className="h-4 w-4" /> Create
      </Button>
    </div>
  );
}
