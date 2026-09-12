import type {
  Barangay,
  City,
  RawOffice,
  Region,
} from '~/models/location.models';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
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
): UseQueryResult<Barangay[], Error> =>
  useQuery({
    queryKey: barangayKeys.byCity(cityId),
    queryFn: () => locationService.getBarangaysByCity(cityId),
    enabled: !!cityId,
  });

export const useGetCitiesByRegion = (
  regionId: string
): UseQueryResult<City[], Error> =>
  useQuery({
    queryKey: cityKeys.byRegion(regionId),
    queryFn: () => locationService.getCitiesByRegion(regionId),
    enabled: !!regionId,
  });

export const useGetRegions = (): UseQueryResult<Region[], Error> =>
  useQuery({
    queryKey: regionKeys.all,
    queryFn: locationService.getRegions,
    placeholderData: [],
  });

export const useGetOffices = (): UseQueryResult<RawOffice[], Error> =>
  useQuery({
    queryKey: officeKeys.all,
    queryFn: locationService.getOffices,
    placeholderData: [],
  });
