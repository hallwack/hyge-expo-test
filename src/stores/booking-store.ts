import { BookingCourt, BookingFacility, CreateBooking } from "@/types/booking";
import { create } from "zustand";

export interface BookingDraft {
  payload: CreateBooking;
  facility: BookingFacility;
  court: BookingCourt;
  price: number;
}

interface BookingStore {
  bookingDraft: BookingDraft | null;
  setBookingDraft: (draft: BookingDraft) => void;
  clearBookingDraft: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  bookingDraft: null,
  setBookingDraft: (draft) => set({ bookingDraft: draft }),
  clearBookingDraft: () => set({ bookingDraft: null }),
}));
