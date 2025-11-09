"use client";
import { CalendarGrid } from "@/components/calender/grid";
import { CalendarHeader } from "@/components/calender/header-bar";
import { CalendarSidebar } from "@/components/calender/sidebar";
import useGetBookings from "@/hooks/use-get-bookings";
import useGetEvents from "@/hooks/use-get-events";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function CalendarPage() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [isReloaded, setIsReloaded] = useState(true);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(Date.now())
  );

  const { data } = useGetBookings(token);

  const { data: EventTypes, loading: EventTypeLoading } = useGetEvents(
    token,
    isReloaded,
    setIsReloaded
  );

  return (
    <div className="flex w-full h-[85vh] bg-background text-foreground overflow-hidden">
      <CalendarSidebar
        token={token}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        EventTypeLoading={EventTypeLoading}
        EventTypes={EventTypes}
        setIsReloaded={setIsReloaded}
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
