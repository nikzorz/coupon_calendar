export interface Coop {
  readonly coopId: number;
  readonly coopName: string;
}

export interface Market {
  readonly marketId: number;
  readonly marketName: string;
  readonly coops?: Coop[];
}
