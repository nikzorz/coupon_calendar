export enum Role {
  Admin = 1,
  Operations = 2,
  Marketing = 3,
  LocalAgency = 4,
  OitViewer = 5
}

export interface User {
  readonly userId?: number;
  readonly email: string;
  readonly passwordHash?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly active: boolean | number;
  readonly role: Role;
  readonly markets: number[];
  readonly version?: number;
  readonly requirePasswordReset?: boolean;
}

export interface UserWithMarketId extends User {
  readonly marketId?: number;
}
