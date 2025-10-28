import { Button } from "@/components/ui/button";
import { Calendar } from "../ui/calendar";
import { Dispatch, SetStateAction } from "react";

type Props = {
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
};

export function CalendarSidebar({ selectedDate, setSelectedDate }: Props) {
  return (
    <aside className="w-72 border-r bg-muted/20 p-4 flex flex-col">
      <div className="flex items-center justify-between  mb-4">
        <h2 className="flex items-center justify-between text-lg font-semibold">
          Calendar
        </h2>

      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={{
          before: new Date(Date.now()),
        }}
        className="rounded-lg border "
        buttonVariant="ghost"
      />

      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
          My Calendars
        </h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            Work
          </li>
          <li className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            Personal
          </li>
        </ul>
      </div>

      <div className="mt-auto pt-4 border-t">
        <Button variant="outline" className="w-full text-sm">
          Settings
        </Button>
      </div>
    </aside>
  );
}
