export interface OfferLibrary {
  readonly offerLibraryId?: number;
  readonly marketId: number;
  readonly offerIds: number[];
  readonly customOfferIds: number[];
  readonly inactiveOfferIds?: number[];
  readonly version?: number;
}