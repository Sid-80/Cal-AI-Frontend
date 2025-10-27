import { CalendarGrid } from "@/components/calender/grid";
import { CalendarHeader } from "@/components/calender/header-bar";
import { CalendarSidebar } from "@/components/calender/sidebar";

export default function CalendarPage() {
  return (
    <div className="flex w-full h-[85vh] bg-background text-foreground overflow-hidden">
      {/* Left Sidebar */}
      <CalendarSidebar />

      {/* Main Section */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <CalendarHeader />
        <CalendarGrid />
      </div>
    </div>
  );
}
