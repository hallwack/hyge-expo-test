export interface Availability {
  date: string;
  courts: AvailabilityCourt[];
}

export interface AvailabilityCourt {
  id: string;
  name: string;
  type: string;
  indoor: boolean;
  slots: AvailabilitySlot[];
}

export interface AvailabilitySlot {
  startTime: string;
  endTime: string;
  price: number;
  available: boolean;
}
