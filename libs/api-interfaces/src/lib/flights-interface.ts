export interface FlightInfo {
  price: number;
  localizedPrice: string;
  priceUSD: number;
  historicalPrice?: any;
  historicPrices: any;
  priceless: boolean;
  predicted: boolean;
  url?: any;
}

export interface Airport {
  latitude: number;
  longitude: number;
  name?: any;
  popularity: number;
  shortName: string;
}

export interface City {
  id: string;
  name: string;
  image?: any;
}

export interface Country {
  code: string;
  name: string;
}

export interface Destination {
  days: number;
  originAirportShortName: string;
  departd: string;
  returnd: string;
  airline: string;
  airlineCode: string;
  airlineIcon: string;
  clickoutUrl: string;
  flightMaxStops: number;
  flightMaxDuration: number;
  relevancyScore: number;
  travelRestrictionInfo?: any;
  flightInfo: FlightInfo;
  airport: Airport;
  city: City;
  country: Country;
}

export interface Origin {
  name: string;
  shortName: string;
  latitude: number;
  longitude: number;
  cityName: string;
  boundaryCoordinates?: any;
}

export interface FlightsTrackerObjectResponse {
  destinations: Destination[];
  origin: Origin;
}
