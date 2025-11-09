import { Button } from "@/components/ui/button";
import { Calendar } from "../ui/calendar";
import { Dispatch, SetStateAction } from "react";
import { CirclePlusIcon } from "lucide-react";
import AddEventTypeDialog from "./add-event-type-dialog";
import useGetEvents from "@/hooks/use-get-events";
import { Spinner } from "../ui/spinner";
import { EventType } from "@/types/types";

type Props = {
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  setIsReloaded: Dispatch<SetStateAction<boolean>>;
  token: string;
  EventTypeLoading: boolean;
  EventTypes: null | EventType[];
};

export function CalendarSidebar({
  selectedDate,
  setSelectedDate,
  token,
  setIsReloaded,
  EventTypeLoading,
  EventTypes,
}: Props) {
  const colourMap: Record<string, string> = {
    yellow: "bg-yellow-600",
    red: "bg-red-600",
    blue: "bg-blue-600",
    green: "bg-green-600",
    purple: "bg-purple-600",
  };

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
        <div className="flex items-center justify-between ">
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">
            My Event Types
          </h3>

          <AddEventTypeDialog setIsReloaded={setIsReloaded} />
        </div>

        <div>
          {!EventTypeLoading && EventTypes ? (
            EventTypes.map((EventType) => (
              <div key={EventType.id} className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    colourMap[EventType.color.toLowerCase()]
                  }`}
                />
                <p className=" capitalize">{EventType.title}</p>
              </div>
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t">
        <Button variant="outline" className="w-full text-sm">
          Settings
        </Button>
      </div>
    </aside>
  );
}
