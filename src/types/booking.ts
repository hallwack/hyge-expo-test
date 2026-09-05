type BookingStatus = "COMPLETED" | "CONFIRMED" | "CANCELLED";

export interface CreateBooking {
  courtId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface BookingFacility {
  id: string;
  name: string;
  imageUrl: string;
}

export interface BookingCourt {
  id: string;
  name: string;
}

export interface Booking {
  id: string;
  bookingReference: string;
  status: BookingStatus;
  facility: BookingFacility;
  court: BookingCourt;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  serviceFee: number;
  totalPrice: number;
}
