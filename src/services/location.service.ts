import type {
  Barangay,
  City,
  RawOffice,
  Region,
} from '~/models/location.models';
import { mockClient } from '~/api/client';

export const locationService = {
  getBarangaysByCity: async (cityId: string): Promise<Barangay[]> => {
    const { data } = await mockClient.get<Barangay[]>('/barangays', {
      params: {
        'cityId:contains': cityId,
      },
    });
    return data.sort((a, b) => a.name.localeCompare(b.name));
  },
  getCitiesByRegion: async (regionId: string): Promise<City[]> => {
    const { data } = await mockClient.get<City[]>('/cities', {
      params: {
        'regionId:contains': regionId,
      },
    });
    return data.sort((a, b) => a.name.localeCompare(b.name));
  },
  getRegions: async (): Promise<Region[]> => {
    const { data } = await mockClient.get<Region[]>('/regions');
    return data.sort((a, b) => a.name.localeCompare(b.name));
  },
  getOffices: async (): Promise<RawOffice[]> => {
    const { data } = await mockClient.get<RawOffice[]>('/offices');
    return data;
  },
};
