import type { Barangay, City, Office, Region } from '~/models/location.models';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { locationService } from '~/services/location.service';

const barangayKeys = {
  all: ['cities'] as const,
  byCity: (cityId: string) => [...barangayKeys.all, { cityId }] as const,
};

const cityKeys = {
  all: ['cities'] as const,
  byRegion: (regionId: string) => [...cityKeys.all, { regionId }] as const,
};

const regionKeys = {
  all: ['regions'] as const,
};

const officeKeys = {
  all: ['office'] as const,
};

export const useGetBarangaysByCity = (
  cityId: string
): UseQueryResult<Barangay[], Error> => {
  return useQuery({
    queryKey: barangayKeys.byCity(cityId),
    queryFn: () => locationService.getBarangaysByCity(cityId),
    enabled: !!cityId,
  });
};

export const useGetCitiesByRegion = (
  regionId: string
): UseQueryResult<City[], Error> => {
  return useQuery({
    queryKey: cityKeys.byRegion(regionId),
    queryFn: () => locationService.getCitiesByRegion(regionId),
    enabled: !!regionId,
  });
};

export const useGetRegions = (): UseQueryResult<Region[], Error> => {
  return useQuery({
    queryKey: regionKeys.all,
    queryFn: locationService.getRegions,
    placeholderData: [],
  });
};

export const useGetOffices = (): UseQueryResult<Office[], Error> => {
  return useQuery({
    queryKey: officeKeys.all,
    queryFn: locationService.getOffices,
    placeholderData: [],
  });
};
