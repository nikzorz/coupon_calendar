import React, {useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {Schedule} from "../../types/schedules/schedules";

export interface UseListSchedulesTypes extends CommonAPI {
  schedules?: Schedule[]
}

export const useListSchedules = (startDate: Date, endDate: Date, marketIds?: number[]):UseListSchedulesTypes => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [schedules, setSchedules] = useState<Schedule[]>();
  const api = useApi();

  const fetchSchedules = (marketIds: number[], startDate: Date, endDate: Date) => {
    const startDateParam = encodeURIComponent(startDate.toISOString());
    const endDateParam = encodeURIComponent(endDate.toISOString());

    setApiStatus(APIStatuses.VERIFYING);

    api.get<Schedule[]>(`/schedule/list?marketIds=${marketIds.join(',')}&startDate=${startDateParam}&endDate=${endDateParam}`)
      .then((resp) => {
        setSchedules(resp.data);
        setApiStatus(APIStatuses.VALID)
      })
      .catch((error) => {
        console.log('List Campaigns error: ', error)
        setApiError(error.toString());
        setApiStatus(APIStatuses.INVALID);
      })
  }

  useEffect(() => {
    if (marketIds && marketIds.length) {
      fetchSchedules(marketIds, startDate, endDate);
    }
  }, [marketIds, startDate.toISOString(), endDate.toISOString()])

  return {
    apiStatus,
    apiError,
    schedules,
  };
}