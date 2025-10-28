"use client";
import { CalendarGrid } from "@/components/calender/grid";
import { CalendarHeader } from "@/components/calender/header-bar";
import { CalendarSidebar } from "@/components/calender/sidebar";
import { useState } from "react";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(Date.now())
  );

  return (
    <div className="flex w-full h-[85vh] bg-background text-foreground overflow-hidden">
      <CalendarSidebar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="flex flex-col flex-1 overflow-y-auto">
        <CalendarHeader
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <CalendarGrid
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
}
