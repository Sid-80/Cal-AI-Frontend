interface EventCardProps {
  title: string;
  time: string;
  color?: string;
}

export function EventCard({ title, time, color = "bg-primary" }: EventCardProps) {
  return (
    <div
      className={`rounded-md text-white text-xs px-2 py-1 mt-1 ${color}`}
    >
      <div className="font-medium">{title}</div>
      <div>{time}</div>
    </div>
  );
}
