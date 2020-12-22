import {Offer} from "../offers/offer";
import {CustomOffer} from "../offers/customOffers";

export enum CampaignType {
  National=1,
  Local=2,
  GameDay=3,
  Flash=4,
  NationalMulti=5,
}

export enum CampaignStatus {
  Approved=1,
  Deploying=2, // Campaigns Starts Deploying
  Deployed=3,
  Rejected=4,
  DeploymentFailed=5,
  Publishing=6, // Campaigns Starts Publishing
}

export enum AudienceType {
  LBO = 1,
  BBO = 2,
}

export enum CustomerEligibility {
  All = 1,
  Current = 2,
  New = 3
}

export enum ValidDay {
  Sunday=0,
  Monday=1,
  Tuesday=2,
  Wednesday=3,
  Thursday=4,
  Friday=5,
  Saturday=6
}

export interface FringeCoopMap {
  [key: string]: number[];
}

export interface DateRange {
  readonly startDate: Date;
  readonly endDate: Date;
}

export interface Notification {
  readonly notificationDate: Date;
  readonly message: string;
}

export interface Campaign {
  readonly campaignId?: number;
  readonly oceCampaignId?: number;
  readonly marketId: number;
  readonly coopIds: number[];
  readonly offerId?: number;
  readonly offer?: Offer;
  readonly customOfferId?: number;
  readonly customOffer?: CustomOffer;
  readonly grcApprovalNumber?: string;
  readonly campaignType: CampaignType;
  readonly audienceType?: AudienceType;
  readonly customerEligibility?: CustomerEligibility;
  readonly audienceGroupId?: number;
  readonly status?: CampaignStatus;
  readonly startDate?: Date;
  readonly endDate?: Date;
  readonly dates?: DateRange[];
  readonly duration?: number;
  readonly validOnStart?: string;
  readonly validOnEnd?: string;
  readonly validOnDays?: ValidDay[];
  readonly archived?: boolean;
  readonly version?: number;
  readonly notification?: Notification;
}

