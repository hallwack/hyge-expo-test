import { api } from "@/api/client";
import { Paginated } from "@/types/api";
import { Booking, CreateBooking } from "@/types/booking";

export type BookingStatusParams = "UPCOMING" | "PAST" | "CANCELLED";

export interface BookingListParams {
  status?: BookingStatusParams;
  page?: number;
}

export const bookingApi = {
  create: (payload: CreateBooking) =>
    api<Booking>("/v1/bookings", { method: "POST", body: payload }),

  list: (params: BookingListParams) =>
    api<Paginated<Booking>>("/v1/bookings", { params: { ...params } }),

  detail: (bookingId: string) => api<Booking>(`/v1/bookings/${bookingId}`),

  delete: (bookingId: string) =>
    api<void>(`/v1/bookings/${bookingId}`, { method: "DELETE" }),
};
