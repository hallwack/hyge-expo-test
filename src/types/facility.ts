export type FacilityType = "STANDARD" | "PANORAMIC" | "VIP";

export interface Facility {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  reviewCount: number;
  sports: string[];
  startingPrice: number;
  imageUrl: string;
}

export interface FacilityDetail {
  id: string;
  name: string;
  description: string;
  address: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  sports: string[];
  amenities: string[];
  courts: Court[];
}

export interface Court {
  id: string;
  name: string;
  type: FacilityType;
  indoor: boolean;
  basePrice: number;
  sports: string;
}
