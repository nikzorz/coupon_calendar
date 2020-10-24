export enum ScheduleWorkflowStatuses {
  Open= 1,
  AgencyReview= 2,
  PendingApproval= 3,
  MarketingApproved= 4,
  Approved= 5,
}

export const scheduleWorkflowInfo = [
  {
    label: 'Open',
    value: ScheduleWorkflowStatuses.Open,
  },
  {
    label: 'Agency Review',
    value: ScheduleWorkflowStatuses.AgencyReview,
  },
  {
    label: 'Marketing Approval',
    value: ScheduleWorkflowStatuses.MarketingApproved,
  },
  {
    label: 'Final Approval',
    value: ScheduleWorkflowStatuses.MarketingApproved,
  },
  {
    label: 'Approved',
    value: ScheduleWorkflowStatuses.Approved,
  },
];