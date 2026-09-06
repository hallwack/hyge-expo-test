import { Booking, CreateBooking } from "@/types/booking";
import { useMutation, useQuery } from "@tanstack/react-query";
import { bookingApi } from "./api";

export function useCreateBooking() {
  return useMutation<Booking, Error, CreateBooking>({
    mutationKey: ["bookings", "create"],
    mutationFn: (payload) => bookingApi.create(payload),
  });
}

export function useBookingList() {
  return useQuery({
    queryKey: ["bookings", "list"],
    queryFn: () => bookingApi.list(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useBookingDetail(bookingId: string) {
  return useQuery({
    queryKey: ["bookings", "detail", bookingId],
    queryFn: () => bookingApi.detail(bookingId),
    enabled: !!bookingId,
  });
}

export function useDeleteBooking() {
  return useMutation<void, Error, string>({
    mutationKey: ["bookings", "delete"],
    mutationFn: (bookingId) => bookingApi.delete(bookingId),
  });
}
