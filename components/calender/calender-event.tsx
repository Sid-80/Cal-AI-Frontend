interface CalendarEventProps {
  title: string;
  time: string;
  color?: string;
  top?: string;
  height?: string;
}

export function CalendarEvent({
  title,
  time,
  color = "bg-blue-600",
  top = "30%",
  height = "10%",
}: CalendarEventProps) {
  return (
    <div
      className={`absolute left-1 right-1 rounded-md text-white px-2 py-1 text-xs shadow-sm ${color}`}
      style={{ top, height }}
    >
      <div className="font-medium">{title}</div>
      <div>{time}</div>
    </div>
  );
}
