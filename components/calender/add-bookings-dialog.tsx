"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CalendarIcon, CirclePlusIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { createAuthenticatedAxiosInstance } from "@/lib/protected-axios";
import { toast } from "sonner";
import { Dispatch, SetStateAction, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isAfter } from "date-fns";
import { cn } from "@/lib/utils";
import { EventType } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const formSchema = z
  .object({
    guest_id: z.string().optional(),
    event_type_id: z.string().min(1, "Event type is required"),
    start_date: z.date("Start date is required"),
    start_time: z.string("Start time is required"),
    end_date: z.date("End date is required"),
    end_time: z.string("End time is required"),
    location: z.string().optional(),
    meeting_link: z.string().optional(),
  })
  .refine(
    (data) => {
      const start = new Date(
        `${data.start_date.toDateString()} ${data.start_time}`
      );
      const end = new Date(`${data.end_date.toDateString()} ${data.end_time}`);
      const now = new Date();
      return isAfter(start, now) && isAfter(end, now) && isAfter(end, start);
    },
    {
      message:
        "Start and end time must be in the future, and end time must be after start time.",
      path: ["end_time"],
    }
  );

type Props = {
  setIsReloaded: Dispatch<SetStateAction<boolean>>;
  EventTypeLoading: boolean;
  EventTypes: null | EventType[];
};

type FormValues = z.infer<typeof formSchema>;

export default function AddBookingDialog({
  setIsReloaded,
  EventTypeLoading,
  EventTypes,
}: Props) {
  const token = useSelector((state: RootState) => state.auth.token);
  const axiosInstance = createAuthenticatedAxiosInstance({}, token);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guest_id: "",
      event_type_id: "",
      start_date: new Date(),
      start_time: "09:00",
      end_date: new Date(),
      end_time: "10:00",
      location: "",
      meeting_link: "",
    },
  });

  async function onSubmit(values: FormValues) {
    const start = new Date(
      `${values.start_date.toDateString()} ${values.start_time}`
    );
    const end = new Date(
      `${values.end_date.toDateString()} ${values.end_time}`
    );

    try {
      const res = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings`,
        {
          ...values,
          start_time: start,
          end_time: end,
        }
      );

      if (res.status === 201) {
        toast.success("Booking created successfully!");
        setIsReloaded(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create booking");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create <CirclePlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Booking</DialogTitle>
          <DialogDescription>
            Create a new booking by selecting an event type, date, and time.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Guest ID */}
            <FormField
              control={form.control}
              name="guest_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Guest ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional guest ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Event Type */}
            <FormField
              control={form.control}
              name="event_type_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={EventTypeLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {EventTypeLoading ? (
                          <SelectItem value="loading" disabled>
                            Loading...
                          </SelectItem>
                        ) : EventTypes && EventTypes.length > 0 ? (
                          EventTypes.map((et) => (
                            <SelectItem key={et.id} value={et.id}>
                              <div className="flex items-center gap-2">
                                <span
                                  className="h-3 w-3 rounded-full"
                                  style={{
                                    backgroundColor: et.color.toLowerCase(),
                                  }}
                                ></span>
                                <span>{et.title}</span>
                              </div>
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="none" disabled>
                            No event types available
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date & Time */}
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={{
          before: new Date(Date.now()),
        }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="start_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* End Date & Time */}
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={{
          before: new Date(Date.now()),
        }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional meeting location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Meeting Link */}
            <FormField
              control={form.control}
              name="meeting_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Optional meeting link (URL)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-end">
              <Button type="submit">
                <CirclePlusIcon className="mr-2 h-4 w-4" />
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
