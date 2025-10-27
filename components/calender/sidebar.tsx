
import { Button } from "@/components/ui/button";
import { MiniMonthView } from "./min-month-view";

export function CalendarSidebar() {
  return (
    <aside className="w-72 border-r bg-muted/20 p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Calendar</h2>

      <MiniMonthView />

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
