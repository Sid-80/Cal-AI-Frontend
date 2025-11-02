"use client";
import { createAuthenticatedAxiosInstance } from "@/lib/protected-axios";
import { Booking } from "@/types/types";
import { useState, useEffect } from "react";

const useGetBookings = (token: string) => {
  const [data, setData] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = createAuthenticatedAxiosInstance({}, token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings`
        );

        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        }
        console.log(response.data);
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useGetBookings;
