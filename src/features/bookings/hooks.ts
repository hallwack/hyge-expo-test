import { Booking, CreateBooking } from "@/types/booking";
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { bookingApi, BookingListParams } from "./api";

export function useInfiniteBookings(params: Omit<BookingListParams, "page">) {
  return useInfiniteQuery({
    queryKey: ["bookings", "infinite", params],
    queryFn: ({ pageParam = 1 }) =>
      bookingApi.list({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}

export function useCreateBooking() {
  return useMutation<Booking, Error, CreateBooking>({
    mutationKey: ["bookings", "create"],
    mutationFn: (payload) => bookingApi.create(payload),
  });
}

export function useBookingList(params: BookingListParams) {
  return useQuery({
    queryKey: ["bookings", "list"],
    queryFn: () => bookingApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useBookingDetail(bookingId: string) {
  return useQuery({
    queryKey: ["bookings", "detail", bookingId],
    queryFn: () => bookingApi.detail(bookingId),
    enabled: !!bookingId,
  });
}

export function useCancelBooking() {
  return useMutation<void, Error, string>({
    mutationKey: ["bookings", "cancel"],
    mutationFn: (bookingId) => bookingApi.cancel(bookingId),
    onSuccess: (_, __, ___, ctx) =>
      ctx.client.invalidateQueries({
        queryKey: ["bookings", "infinite"],
      }),
  });
}
