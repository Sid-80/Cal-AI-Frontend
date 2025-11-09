"use client";
import { createAuthenticatedAxiosInstance } from "@/lib/protected-axios";
import { EventType } from "@/types/types";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

const useGetEvents = (
  token: string,
  isReloaded: boolean,
  setIsReloaded: Dispatch<SetStateAction<boolean>>
) => {
  const [data, setData] = useState<EventType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosInstance = createAuthenticatedAxiosInstance({}, token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/event-types`
        );

        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        }

        setData(response.data.event_types);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
        setIsReloaded(false);
      }
    };

    if (isReloaded) {
      fetchData();
    }
  }, []);

  return { data, loading, error };
};

export default useGetEvents;
