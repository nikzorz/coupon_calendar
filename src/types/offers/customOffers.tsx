import {Offer} from "./offer";

export interface CustomOffer extends Offer {
  readonly customOfferId: number;
  readonly marketId?: number;
  readonly name: string;
  readonly imageRequest: string;
  readonly pluRequest: string;
  readonly archived: boolean;
  readonly version: number;
}
