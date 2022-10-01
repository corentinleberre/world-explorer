import { Destination } from '..';

export interface DestinationsDTO {
  to: string;
  totalPrice: string;
  flights: Array<DestinationDTO>;
}

export interface DestinationDTO extends Destination {}
