import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {getCurrentDate} from "../../../services/datetimeHelpers";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, FormControl, FormHelperText, Grid, Input, InputLabel, TextField} from "@material-ui/core";
import {KeyboardDatePicker} from "@material-ui/pickers";
import { Link as RouterLink } from 'react-router-dom';

export interface ScheduleFormInputs {
  title: string
  startDate: string
  endDate: string
}

export interface ScheduleFormProps {
  onSubmit(values: ScheduleFormInputs): void
}

export const scheduleFormSchema = yup.object().shape({
  title: yup.string().required('Schedule Name is a required field'),
  endDate: yup.date().min(getCurrentDate(), 'End Date cannot be in the past')
});

export const ScheduleForm: React.FC<ScheduleFormProps> = ({ onSubmit }) => {

  const {
    handleSubmit,
    control,
    errors
  } = useForm<ScheduleFormInputs>({
    resolver: yupResolver(scheduleFormSchema)
  })

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Schedule Name */}
          <Grid item xs={8}>
            <Controller
              name='title'
              defaultValue=""
              control={control}
              render={({onBlur, onChange, value}) => (
                <TextField
                  variant="filled"
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
            <Controller
              name="startDate"
              defaultValue={getCurrentDate()}
              control={control}
              render={({onChange, value}) => (
                <KeyboardDatePicker
                  onChange={onChange}
                  value={value}
                  variant="inline"
                  inputVariant="filled"
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
          </Grid>
          <Grid item >
            <Controller
              name="endDate"
              defaultValue={getCurrentDate()}
              control={control}
              render={({onChange, value}) => (
                <KeyboardDatePicker
                  onChange={onChange}
                  value={value}
                  variant="inline"
                  inputVariant="filled"
                  label="Schedule Start Date"
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