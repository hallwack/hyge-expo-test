import { api } from "@/api/client";
import { Booking, CreateBooking } from "@/types/booking";

export const bookingApi = {
  create: (payload: CreateBooking) =>
    api<Booking>("/v1/bookings", { method: "POST", body: payload }),

  list: () => api<Booking[]>("/v1/bookings"),

  detail: (bookingId: string) => api<Booking>(`/v1/bookings/${bookingId}`),

  delete: (bookingId: string) =>
    api<void>(`/v1/bookings/${bookingId}`, { method: "DELETE" }),
};
