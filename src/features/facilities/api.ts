import { api } from "@/api/client";
import { Paginated } from "@/types/api";
import { Availability } from "@/types/availability";
import { Facility, FacilityDetail } from "@/types/facility";
import { City, Sport } from "@/types/lookup";

export interface FacilityListParams {
  page?: number;
  search?: string;
  sport?: string;
  city?: string;
}

export const facilityApi = {
  list: (params: FacilityListParams) =>
    api<Paginated<Facility>>("/v1/facilities", {
      params: { ...params },
    }),

  detail: (id: string) => api<FacilityDetail>(`/v1/facilities/${id}`),

  availability: (id: string, date: string) =>
    api<Availability>(`/v1/facilities/${id}/availability`, {
      params: { date },
    }),

  lookupCity: () => api<City>("/v1/cities"),
  lookupSport: () => api<Sport>("/v1/sports"),
};
