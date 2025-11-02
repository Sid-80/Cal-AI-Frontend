"use client";
import { CalendarGrid } from "@/components/calender/grid";
import { CalendarHeader } from "@/components/calender/header-bar";
import { CalendarSidebar } from "@/components/calender/sidebar";
import useGetBookings from "@/hooks/use-get-bookings";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CalendarPage() {
  const token = useSelector((state:RootState)=> state.auth.token);
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(Date.now())
  );
  
  const {data} = useGetBookings(token)

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
