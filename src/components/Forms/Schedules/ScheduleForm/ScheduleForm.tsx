import React, {useMemo} from 'react';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from "react-hook-form";
import {Box, Button, CircularProgress, Grid, TextField} from "@material-ui/core";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {Link as RouterLink} from 'react-router-dom';
import {useLastSchedule} from "../../../../hooks/schedules/use-last-schedule";
import {APIStatuses} from "../../../../hooks/api/use-api";
import {toDate, utcToZonedTime, zonedTimeToUtc} from "date-fns-tz";
import {useConfig} from "../../../../hooks/config/use-config";
import {addDays, parseISO, set} from "date-fns";

export interface ScheduleFormInputs {
  title: string
  startDate: Date
  endDate: Date
}

export interface ScheduleFormProps {
  onSubmit(values: ScheduleFormInputs): void
}

export const ScheduleForm: React.FC<ScheduleFormProps> = ({ onSubmit }) => {

  const {
    timezone
  } = useConfig();

  const scheduleFormSchema = useMemo(() =>
    yup.object().shape({
      title: yup.string().required('Schedule Name is a required field'),
      endDate: yup.date().min(utcToZonedTime(new Date(), timezone), 'End Date cannot be in the past')
    })
  ,[timezone]);

  const {
    handleSubmit,
    control,
    errors
  } = useForm<ScheduleFormInputs>({
    resolver: yupResolver(scheduleFormSchema)
  });

  const {
    lastSchedule,
    apiStatus
  } = useLastSchedule();

  const lastScheduleDate = lastSchedule && addDays(utcToZonedTime(lastSchedule.endDate, timezone), 1);

  const handleOnSubmit = (values: ScheduleFormInputs) => {

    // reformat date values to the correct time and timezone
    onSubmit(
      {
        ...values,
        startDate: zonedTimeToUtc(set(values.startDate, {
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0
        }), timezone),
        endDate: zonedTimeToUtc(set(values.startDate, {
          hours: 23,
          minutes: 59,
          seconds: 59,
          milliseconds: 0
        }), timezone)
      }
    )
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Grid container spacing={3}>
          {/* Schedule Name */}
          <Grid item xs={8}>
            <Controller
              name='title'
              control={control}
              defaultValue=""
              render={({onBlur, onChange, value}) => (
                <TextField
                  variant="filled"
                  color="secondary"
                  label="Schedule Name*"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  fullWidth
                />
              )}
            />
          </Grid>
          <Grid item xs={4} />
          {/* Schedule Start and End Dates */}
          <Grid item >
            {apiStatus === APIStatuses.VALID ? (
              <Controller
                name="startDate"
                control={control}
                defaultValue={lastScheduleDate}
                render={({onChange, value}) => (
                  <KeyboardDatePicker
                    onChange={onChange}
                    value={value}
                    variant="inline"
                    inputVariant="filled"
                    color="secondary"
                    label="Schedule Start Date"
                    format="MM/dd/yyyy"
                    error={!!errors.startDate}
                    helperText={errors.startDate?.message}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    disabled
                    autoOk
                  />
                )}
              />
            ) : (
              <CircularProgress />
            )}
          </Grid>
          <Grid item >
            {apiStatus === APIStatuses.VALID ? (
              <Controller
                name="endDate"
                defaultValue={lastScheduleDate}
                control={control}
                render={({onChange, value}) => (
                  <KeyboardDatePicker
                    onChange={onChange}
                    value={value}
                    variant="inline"
                    inputVariant="filled"
                    color="secondary"
                    label="Schedule End Date"
                    format="MM/dd/yyyy"
                    error={!!errors.endDate}
                    helperText={errors.endDate?.message}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    autoOk
                  />
                )}
              />
            ) : (
              <CircularProgress />
            )}
          </Grid>
          <Grid item xs={7} />
        </Grid>
        <Box
          display="flex"
          justifyContent="space-between"
          marginTop="20px"
        >
          <Button
            component={RouterLink}
            variant="outlined"
            to="/schedules"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}