import React, {useEffect, useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {Schedule} from "../../types/schedules/schedules";

export interface UseLastScheduleType extends CommonAPI {
  lastSchedule?: Schedule
}

export const useLastSchedule = (): UseLastScheduleType => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const [lastSchedule, setLastSchedule] = useState<Schedule>()
  const api = useApi();

  const getLastSchedule = () => {
    setApiStatus(APIStatuses.VERIFYING);
    api.get<Schedule>('/schedule/last')
      .then((resp) => {
        setLastSchedule(resp.data)
        setApiStatus(APIStatuses.VALID)
      })
      .catch((error) => {
        console.log('Last Schedule Error: ', error)
        setApiError(error.toString())
        setApiStatus(APIStatuses.INVALID)
      })
  }

  useEffect(() => {
      getLastSchedule();
  }, [])

  return {
    apiStatus,
    apiError,
    lastSchedule
  }
}