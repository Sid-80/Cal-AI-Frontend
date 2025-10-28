"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { format, addWeeks, subWeeks, startOfWeek } from "date-fns";

type Props = {
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
};

export function CalendarHeader({ selectedDate, setSelectedDate }: Props) {
  const today = new Date();
  const nextWeek = () => setSelectedDate(addWeeks(selectedDate!, 1));

  const prevWeek = () => {
    const prev = subWeeks(selectedDate!, 1);
    const startOfPrevWeek = startOfWeek(prev, { weekStartsOn: 0 }); // Sunday (change to 1 if Monday start)
    if (startOfPrevWeek < startOfWeek(today, { weekStartsOn: 0 })) {
      setSelectedDate(today);
    } else {
      setSelectedDate(prev);
    }
  };

  return (
    <div className="flex justify-between items-center border-b bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <Button
          disabled={selectedDate!.getDate() == new Date(Date.now()).getDate()}
          size="icon"
          variant="ghost"
          onClick={prevWeek}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="ghost" onClick={nextWeek}>
          <ChevronRight className="w-4 h-4" />
        </Button>
        <h2 className="text-lg font-semibold ml-2">
          {format(selectedDate!, "MMMM yyyy")}
        </h2>
        {selectedDate!.getDate() !== new Date(Date.now()).getDate() && (
          <Button
            variant={"outline"}
            className=" ml-4"
            onClick={() => setSelectedDate(new Date(Date.now()))}
          >
            Today
          </Button>
        )}
      </div>

      <Button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700">
        <Plus className="h-4 w-4" /> Create
      </Button>
    </div>
  );
}
