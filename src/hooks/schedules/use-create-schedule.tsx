import React, {useState} from 'react';
import {APIStatuses, CommonAPI, useApi} from "../api/use-api";
import {ScheduleFormInputs} from "../../components/Forms/Schedules/ScheduleForm/ScheduleForm";

export interface UseCreateScheduleTypes extends CommonAPI {
  createSchedule(values: ScheduleFormInputs): void
}

export const useCreateSchedule = ():UseCreateScheduleTypes => {
  const [apiStatus, setApiStatus] = useState<APIStatuses>(APIStatuses.UNVERIFIED);
  const [apiError, setApiError] = useState<string>();
  const api = useApi();

  const createSchedule = (values: ScheduleFormInputs) => {
    setApiStatus(APIStatuses.VERIFYING);

    api.post('/schedule', values)
      .then((resp) => {
        setApiStatus(APIStatuses.VALID)
      })
      .catch((error) => {
        console.log('List Campaigns error: ', error)
        setApiError(error.toString());
        setApiStatus(APIStatuses.INVALID);
      })
  }
  return {
    apiStatus,
    apiError,
    createSchedule,
  };
}