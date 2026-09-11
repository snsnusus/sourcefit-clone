export interface Barangay {
  id: string;
  cityId: string;
  name: string;
  zipCode: string;
}

export interface City {
  id: string;
  provinceId: string;
  name: string;
}

export interface Region {
  id: string;
  name: string;
}

export type RawOffice = {
  id: string;
  city: string;
  countryCode: string;
  label: string;
};
