import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { facilityApi, type FacilityListParams } from "./api";

export function useInfiniteFacilities(
  params: Omit<FacilityListParams, "page">,
) {
  return useInfiniteQuery({
    queryKey: ["facilities", "infinite", params],
    queryFn: ({ pageParam = 1 }) =>
      facilityApi.list({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}

export function useFacilities(params: FacilityListParams) {
  return useQuery({
    queryKey: ["facilities", "list", params],
    queryFn: () => facilityApi.list(params),
    placeholderData: keepPreviousData,
  });
}

export function useFacility(id: string) {
  return useQuery({
    queryKey: ["facilities", "detail", id],
    queryFn: () => facilityApi.detail(id),
    enabled: !!id,
  });
}

export function useAvailability(id: string, date: string) {
  return useQuery({
    queryKey: ["facilities", "detail", "availability", id, date],
    queryFn: () => facilityApi.availability(id, date),
    enabled: !!id && !!date,
    placeholderData: keepPreviousData,
  });
}

export function useLookupCity() {
  return useQuery({
    queryKey: ["facilities", "lookup", "city"],
    queryFn: () => facilityApi.lookupCity(),
    staleTime: 1000 * 60 * 60,
  });
}

export function useLookupSport() {
  return useQuery({
    queryKey: ["facilities", "lookup", "sport"],
    queryFn: () => facilityApi.lookupSport(),
    staleTime: 1000 * 60 * 60,
  });
}
