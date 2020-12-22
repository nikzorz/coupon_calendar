import React, {useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {Schedule} from "../../types/schedules/schedules";

export interface UseSchedulesTypes extends CommonAPI {
  schedule?: Schedule
}

export const useSchedule = (startDate: Date, endDate: Date, marketId?: number):UseSchedulesTypes => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [schedule, setSchedule] = useState<Schedule>();
  const api = useApi();

  const fetchSchedule = (marketId: number, startDate: Date, endDate: Date) => {
    const startDateParam = encodeURIComponent(startDate.toISOString());
    const endDateParam = encodeURIComponent(endDate.toISOString());

    setApiStatus(APIStatuses.VERIFYING);

    api.get<Schedule[]>(`/schedule/list?marketIds=${marketId}&startDate=${startDateParam}&endDate=${endDateParam}`)
      .then((resp) => {
        setSchedule(resp.data[0]);
        setApiStatus(APIStatuses.VALID)
      })
      .catch((error) => {
        console.log('List Campaigns error: ', error)
        setApiError(error.toString());
        setApiStatus(APIStatuses.INVALID);
      })
  }

  useEffect(() => {
    if (marketId) {
      fetchSchedule(marketId, startDate, endDate);
    }
  }, [marketId, startDate.toISOString(), endDate.toISOString()])

  return {
    apiStatus,
    apiError,
    schedule,
  };
}