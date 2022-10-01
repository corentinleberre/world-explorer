import { Destination } from '..';

export interface DestinationsDTO {
  from: Array<string>;
  to: string;
  totalPrice: string;
  flights: Array<DestinationDTO>;
}

export interface DestinationDTO extends Destination {}
