export enum WorkflowStatus {
  Open= 1,
  AgencyReview= 2,
  PendingApproval= 3,
  MarketingApproved= 4,
  Approved= 5
}

export interface MarketSchedule {
  readonly marketScheduleId: number;
  readonly scheduleId?: number;
  readonly marketId: number;
  readonly workflowStatus: WorkflowStatus;
  readonly version: number;
  readonly workflowVersion: number;
}

export interface MarketScheduleWithName {
  readonly marketScheduleId: number;
  marketScheduleName: string | undefined;
  readonly marketId: number;
  readonly workflowStatus: WorkflowStatus;
  readonly version: number;
  readonly workflowVersion: number;
}

export interface Schedule {
  readonly scheduleId?: number
  readonly title: string
  readonly startDate: string
  readonly endDate: string
  readonly archived: string
  readonly marketSchedules?: MarketSchedule[]
}
//
// export class Schedule {
//   readonly scheduleId?: number;
//
//   @MaxLength(50, {
//     message: 'Title is too long. Maximal length is $constraint1 characters, but actual is $value'
//   })
//   readonly title!: string;
//   readonly startDate!: Date;
//   readonly endDate!: Date;
//   readonly archived?: boolean;
//   readonly marketSchedules?: MarketSchedule[];
// }


