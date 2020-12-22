import React from 'react';
import {ScheduleForm} from "../../Forms/Schedules/ScheduleForm/ScheduleForm";
import {DefaultFormLayout} from "../../Layouts/DefaultFormLayout";
import {useCreateSchedule} from "../../../hooks/schedules/use-create-schedule";
import {APIStatuses} from "../../../hooks/api/use-api";
import { Dialog, DialogActions, DialogTitle, Link,} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";

export const ScheduleCreatePage: React.FC = () => {

  const {
    createSchedule,
    apiStatus: submitStatus
  } = useCreateSchedule();


  return (
    <DefaultFormLayout
      title="Create New Schedule"
    >
      <ScheduleForm
        onSubmit={(values) => {
          createSchedule(values)
        }}
      />
      <Dialog
        open={submitStatus === APIStatuses.VALID}
        aria-labelledby="schedule-dialog-title"
        aria-describedby="schedule-dialog-description"
        disableBackdropClick
        disableEscapeKeyDown
      >
        <DialogTitle id="schedule-dialog-title">
          Schedule created successfully
        </DialogTitle>
        <DialogActions>
          <Link
            component={RouterLink}
            to="/schedules"
          >
            Return to Schedules
          </Link>
        </DialogActions>
      </Dialog>
    </DefaultFormLayout>
  )
}